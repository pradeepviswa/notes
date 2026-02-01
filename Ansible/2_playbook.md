
# Simple Playbook to install apache2
```
# filename: playbook1.yml
---
- name: test deployment
  hosts: dev
  become: true
  tasks:
    - name: Update apt cache
      ansible.builtin.package:
        update_cache: yes
    - name: Install apache2
      ansible.builtin.package:
        name: apache2
        state: present
    - name: create a directory
      ansible.builtin.file:
        path: test_folder
        state: directory
        mode: '0755'
```
#### dry run
```
 ansible-playbook playbook1.yml --check
```

#### run playbook
```
ansible-playbook playbook1.yml
```

# Write a playbook to install apache web site which is in github
#### without nofify
```
---
- name: install apache from github
  hosts: all
  become: yes

  tasks:
    - name: update package cache
      ansible.builtin.package:
        update_cache: yes

    - name: install apache
      ansible.builtin.package:
        name: apache2
        state: present

    - name: stop apache2 service
      ansible.builtin.service:
        name: apache2
        state: stopped

    - name: delete existing website files
      ansible.builtin.file:
        path: /var/www/html
        state: absent

    - name: clone github repo
      ansible.builtin.git:
        repo: https://github.com/pradeepviswa/apachewebsite.git
        dest: /var/www/html
        force: yes

    - name: start apache2 service
      ansible.builtin.service:
        name: apache2
        state: restarted

```


#### install apache with with nofify
```
- name: install apache from guthub
  hosts: all
  become: yes
  tasks
  - name: update package
    package:
      update_cache: yes
  - name: install apache
    package:
       name: apache2
       state: present
    notify: restart apache2

  handlers:
    - name: restart apache2
      ansible.buildin.service:
        name: apache2
        state: restarted

```






