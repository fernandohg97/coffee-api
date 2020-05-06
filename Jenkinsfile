// Jenkinsfile (Declarative Pipeline)
pipeline {
    // agent { docker { image 'node:6.3' } }
    agent any
    environment {
      DISABLE_AUTH = 'true'
      DB_ENGINE = 'mysql'
    }
    stages {
        stage('build') {
            steps {
                echo "Database engine is ${DB_ENGINE}"
                echo "DISABLE_AUTH is ${DISABLE_AUTH}"
                sh 'npm start'
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
