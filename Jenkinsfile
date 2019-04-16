pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                parallel (
                    phase1: { sh 'env' },
                    phase2: { sh 'env' }
                )
            }
        }
    }
}
