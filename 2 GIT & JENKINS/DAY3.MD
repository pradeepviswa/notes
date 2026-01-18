# groovy script

## pre-requiestes
Install Jenkins: https://github.com/pradeepviswa/deployment-scripts/blob/main/jenkins.sh

maven build help document: https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html

checkstyle tool used by maven for quality assurance: https://maven.apache.org/plugins/maven-checkstyle-plugin/

## steps
1. new item -> pipeline
   click on pipeline and write groovy script, follwo pipelien syntx for help to create groovy script
```
pipeline{
  agent any
  stages{
    stage("checkout the code from GitHub"){
      steps{        

      }
    }    
  }
}
```

2. groovy with some stages and steps
```
pipeline{
  agent any
  stages{
    stage("1: checkout the code from GitHub"){
      steps{
        git 'https://github.com/pradeepviswa/addressbook-cicd-project'
        echo 'checkout completed'
      }
    }//stage 1
    
    stage("2: compile the project using maven"){
        steps{
            sh 'mvn compile'
        }
    }//stage2
    
    stage("3: Runt he test cases"){
        steps{
            sh 'mvn test'
        }
    }//stage 3
    
    stage("4: Quality assurance"){
        steps{
            // identify bugs and issuges in the code
            sh 'mvn checkstyle:checkstyle'
        }
        }//stage 4
    
    
  }//stages

}
```

3. generage reports
   manage -> plugins -> warning plugin install
   pipeline suyntax: 
  recordIssues: record compiler warning
  tool: checkstyle
  generate pipelien script
  updatd code with checkstyle recordIssue
```
pipeline{
  agent any
  stages{
    stage("1: checkout the code from GitHub"){
      steps{
        git 'https://github.com/pradeepviswa/addressbook-cicd-project'
        echo 'checkout completed'
      }
    }//stage 1
    
    stage("2: compile the project using maven"){
        steps{
            sh 'mvn compile'
        }
    }//stage2
    
    stage("3: Runt he test cases"){
        steps{
            sh 'mvn test'
        }
    }//stage 3
    
    stage("4: Quality assurance"){
        steps{
            // identify bugs and issuges in the code
            sh 'mvn checkstyle:checkstyle'
            recordIssues sourceCodeRetention: 'LAST_BUILD', tools: [checkStyle()]
        }
    }//stage 4
    
    stage("5: Pacakge the project"){
        steps{
            sh 'mvn package'
        }
        
    }//stage 5
    
  }//stages

}
```

4. CD Part - Deploy.
   Deploy it in localmachine using tomcat
   Copy link address of tomcat zip file https://tomcat.apache.org/download-90.cgi
   For now I am using: https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.113/bin/apache-tomcat-9.0.113.zip
   On Jenkisn machine
   once below steps are done try to acess tompact at port 9090. Example http://54.82.98.100:9090
```
sudo su
wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.113/bin/apache-tomcat-9.0.113.zip
apt install unzip -y
unzip apache-tomcat-9.0.113.zip
#here tomcat and jenkins both using port 8080. Chagne the port for tomcat
cd apache-tomcat-9.0.113/conf
cd conf
vi server.xml
# seearch for this line
#<Connector port="8081" protocol="HTTP/1.1" 
# and repalce it to 9090. save and exit
cd ..
cd bin
# gieve read adn execute permission to all .sh files
chmod 700 *.sh
bash startup.sh 

```
4.1. we will copy war file from Jensins lcoation to tomcat webapp directory which is in root location

```
visudo
#just under root enter below line
jenkins ALL=(ALL:ALL) NOPASSWD: ALL
#restart jenkins
service jenkins restart
```

4.2. Deploy application in tomcat

pacakge has created war file here: /var/lib/jenkins/workspace/web-app-pipeline-2/target/addressbook.war

copy this  war file from jenkisn workpsace to tomcat location

Jenkins location: /var/lib/jenkins/workspace/web-app-pipeline-2/target/addressbook.war

Tomcat locatioon: /home/ubuntu/apache-tomcat-9.0.113/webapps

got o jenkins pipeline, configure
```
cp  /var/lib/jenkins/workspace/web-app-pipeline-2/target/addressbook.war /home/ubuntu/apache-tomcat-9.0.113/webapps
```

   
4.3. Complete pipeline configuration once again with deploy code
```
pipeline{
    agent any
    stages{
        stage("1: checkout the repo"){
            steps{
                git 'https://github.com/pradeepviswa/addressbook-cicd-project.git'
                echo 'git repo cloned'
            }
        }//stage1
        stage("2: Validate code"){
            steps{
                sh 'mvn validate'    
            }
        }//stage2
        
        stage("3: test the code"){
            steps{
                sh 'mvn test'
            }
        }//stage3
        
        stage("4: quality assurance"){
            steps{
                sh 'mvn checkstyle:checkstyle'
                recordIssues sourceCodeRetention: 'LAST_BUILD', tools: [checkStyle()]
            }
        }//stage5
        
        stage("6: package"){
            steps{
                sh 'mvn package'
            }
        }//stage6
        
        stage("7: Deploy the project"){
            steps{
                sh 'sudo cp  /var/lib/jenkins/workspace/web-app-pipeline-2/target/addressbook.war /home/ubuntu/apache-tomcat-9.0.113/webapps'
            }
        }//state 7
    }//stages
    
}
```

5. Try to access website: http://54.82.98.100:9090/addressbook/

6. configure webhook for auto CI/CD
   webhook document: https://github.com/pradeepviswa/notes/blob/main/2%20GIT%20%26%20JENKINS/DAY2.MD
