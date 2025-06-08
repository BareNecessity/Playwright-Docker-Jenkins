pipeline {
  agent any

  stages {
    stage('Build and Test') {
      steps {
        script {
          sh 'docker-compose up --build --abort-on-container-exit'
        }
      }
    }
  }

  post {
    always {
      script {
        sh 'docker-compose down'
      }
    }
  }
}
