# ansible roles
- structured way to organize the playbook
- format
```
.
└── role1
    ├── README.md
    ├── defaults
    │   └── main.yml
    ├── files
    ├── handlers
    │   └── main.yml
    ├── meta
    │   └── main.yml
    ├── tasks
    │   └── main.yml
    ├── templates
    ├── tests
    │   ├── inventory
    │   └── test.yml
    └── vars
        └── main.yml
```

# Ansible Minimal Role Demo (tasks, handlers, defaults, meta) 


This document contains a minimal Ansible role (minrole) and the accompanying inventory and playbook files. Copy-paste these into your project and run the playbook.
- Create Role Folders
```
ansible-galaxy init minrole
```
2) Role Files
- vi minrole/defaults/main.yml
```
# Lowest-priority defaults
minrole_pkg: apache2          
minrole_service: apache2    
minrole_message: "Hello from minrole!"
```

- vi minrole/tasks/main.yml
```
---
# Static imports (parsed at load time)
- import_tasks: install.yml
- import_tasks: configure.yml
```

- vi minrole/tasks/install.yml
---
- name: Install web server
  package:
    name: "{{ minrole_pkg }}"
    state: present

- name: Ensure service enabled  running
  service:
    name: "{{ minrole_service }}"
    state: started
    enabled: true
```

- vi minrole/tasks/configure.yml
```
---
- name: Drop a tiny homepage
  copy:
    dest: /var/www/html/index.html
    content: "{{ minrole_message }}"
    mode: "0644"
  notify: Restart web
```

- vi minrole/handlers/main.yml
```
---
- name: Restart web
  service:
    name: "{{ minrole_service }}"
    state: restarted
```

- vi minrole/meta/main.yml
```
dependencies: []
```

- vi site.yml #It should be created outside the minrole
```
---
- name: Apply minrole
  hosts: all
  become: true
  roles:
    - role: minrole
```

4) Run the Playbook
```
ansible-playbook -i inventory site.yml
```

5) Validate Output
- sudo cat /var/www/html/index.html
- You should see: “Hello from minrole!”

Notes
- On RHEL/CentOS/Fedora set “minrole_pkg: httpd” and “minrole_service: httpd”.
- Handlers run only when notified (here: when the homepage content changes).
- “import tasks” is static (parsed at playbook load time).



