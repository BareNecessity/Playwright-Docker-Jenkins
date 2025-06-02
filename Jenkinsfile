pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.43.1-jammy'
      args '-u root'
    }
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/BareNecessity/Playwright-Docker-Jenkins', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright test'
      }
    }

    stage('Generate and Archive HTML Report') {
      steps {
        sh 'npx playwright show-report --viewer none || true'
        archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
      }
    }

    stage('Publish HTML Report') {
      steps {
        publishHTML(target: [
          allowMissing: true,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report'
        ])
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed!'
    }
    failure {
      echo 'Pipeline failed. Check logs above.'
    }
  }
}