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
