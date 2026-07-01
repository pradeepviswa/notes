---
# PLAY 1: Provision and Configure the Database Server
- name: Install and Configure MySQL Database Server
  hosts: dbservers
  become: yes
  vars:
    db_pass: "my@pass"

  tasks:
    - name: Update apt repository cache
      apt:
        update_cache: yes

    - name: Install MySQL Server and Python dependencies
      apt:
        name:
          - mysql-server
          - python3-pymysql
        state: present

    - name: Ensure MySQL service is running and enabled
      service:
        name: mysql
        state: started
        enabled: yes

    - name: Configure MySQL to listen on all network interfaces
      lineinfile:
        path: /etc/mysql/mysql.conf.d/mysqld.cnf
        regexp: '^bind-address'
        line: 'bind-address            = 0.0.0.0'
        backup: yes
      notify: Restart MySQL

    - name: Create application database
      mysql_db:
        name: user_db
        state: present
        login_unix_socket: /var/run/mysqld/mysqld.sock

    - name: Create database user for the web server
      mysql_user:
        name: web_user
        password: "{{ db_pass }}"
        priv: 'user_db.*:ALL'
        host: '%'
        state: present
        login_unix_socket: /var/run/mysqld/mysqld.sock

    - name: Create application table schema
      mysql_query:
        login_db: user_db
        login_unix_socket: /var/run/mysqld/mysqld.sock
        query: |
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            phone VARCHAR(50),
            address TEXT
          );

  handlers:
    - name: Restart MySQL
      service:
        name: mysql
        state: restarted

# PLAY 2: Configure and Start Secure Flask Web Server
- name: Configure and Start Secure Flask Web Server
  hosts: webservers
  become: yes
  vars:
    db_pass: "my@pass"

  tasks:
    - name: Update apt repository cache
      apt:
        update_cache: yes

    - name: Install Python3 and Flask via apt
      apt:
        name: 
          - python3
          - python3-pip
          - python3-flask
        state: present

    - name: Install updated MySQL Connector via pip (Python 3.12 compatible)
      pip:
        name: mysql-connector-python
        state: latest
        extra_args: --break-system-packages

    - name: Copy Flask application file to server
      copy:
        src: ./app.py
        dest: /home/ubuntu/app.py
        owner: ubuntu
        group: ubuntu
        mode: '0644'

    - name: Kill any existing Flask application instance running on Port 80
      shell: "fuser -k 80/tcp || true"

    - name: Ensure Flask application is running with Dynamic DB Credentials
      shell: "nohup env DB_HOST={{ hostvars[groups['dbservers'][0]]['ansible_facts']['default_ipv4']['address'] }} DB_PASSWORD='{{ db_pass }}' python3 /home/ubuntu/app.py > /home/ubuntu/app.log 2>&1 &"
      async: 10
      poll: 0
	  
    - name: Wait briefly for port 80 to respond
      wait_for:
        port: 80
        delay: 2
        timeout: 10