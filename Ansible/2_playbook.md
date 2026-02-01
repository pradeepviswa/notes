
# Simple Playbook to install apache2
```
# filename: playbook1.yml

---<div style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 8px;">
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
</div>```

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

    - name: start apache2 service
      ansible.builtin.service:
        name: apache2
        state: restarted

    - name: delete existing website files
      ansible.builtin.file:
        path: /var/www/html
        state: absent

    - name: clone github repo
      ansible.builtin.git:
        repo: https://github.com/pradeepviswa/apachewebsite.git
        dest: /var/www/html
        force: yes
```


#### install apache with with nofify
```
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
      notify: restart service

    - name: delete existing website files
      ansible.builtin.file:
        path: /var/www/html
        state: absent

    - name: clone github repo
      ansible.builtin.git:
        repo: https://github.com/pradeepviswa/apachewebsite.git
        dest: /var/www/html
        force: yes

  handlers:
     - name: restart service
       ansible.builtin.service:
         name: apache2
         state: restarted:
```

#### using variable
```
---
- name: install apache from github
  hosts: all
  become: yes


  vars:
    web_package: apache2
    web_service: apache2
    web_root: /var/www/html/
    git_repo: https://github.com/pradeepviswa/apachewebsite.git

  tasks:
    - name: update package cache
      ansible.builtin.package:
        update_cache: yes

    - name: install apache
      ansible.builtin.package:
        name: "{{ web_package }}"
        state: present
      notify: restart service

    - name: delete existing website files
      ansible.builtin.file:
        path: "{{ web_root }}"
        state: absent

    - name: clone github repo
      ansible.builtin.git:
        repo: "{{ git_repo }}"
        dest: "{{ web_root }}"
        force: yes

  handlers:
     - name: restart service
       ansible.builtin.service:
         name: "{{ web_service }}"
         state: restarted
```





