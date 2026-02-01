
# Format of Playbook to install apache2
```
---
- name: test deployment
  hosts: dev
  become: true
  tasks:
    - name: Install ntpdate
      ansible.builtin.package:
        name: apache2
        state: present
    - name: create a directory
      ansible.builtin.file:
        path: /home/devops/test_folder
        state: directory
        mode: '0755'
        
  
```
