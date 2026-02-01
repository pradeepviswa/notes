
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

