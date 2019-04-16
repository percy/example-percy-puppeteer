pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                parallel (
                    phase1: {
                        sh 'env'
                        sh 'git show'
                        sh 'git log -n 2'
                    },
                    phase2: {
                        sh 'env'
                        sh 'git show'
                        sh 'git log -n 2'
                    }
                )
            }
        }
    }
}
