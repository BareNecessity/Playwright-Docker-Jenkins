pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.43.1-jammy' // Official Playwright Docker image
      args '-u root'
    }
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'test-results/**/*.*', allowEmptyArchive: true
      junit 'test-results/**/*.xml'
    }
  }
}
