pipeline {
    agent {
        label 'docker'
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    label 'docker'
                    image 'node:8-alpine'
                    args '-p 3000:3000'
                }
            }


            steps {
              sh 'env'
              sh 'npm i'
              sh 'npm run test'
              sh 'git show HEAD --quiet --format="COMMIT_SHA:%H%nAUTHOR_NAME:%an%nAUTHOR_EMAIL:%ae%nCOMMITTER_NAME:%cn%nCOMMITTER_EMAIL:%ce%nCOMMITTED_DATE:%ai%nCOMMIT_MESSAGE:%B"'
              sh 'git show HEAD^ --quiet --format="COMMIT_SHA:%H%nAUTHOR_NAME:%an%nAUTHOR_EMAIL:%ae%nCOMMITTER_NAME:%cn%nCOMMITTER_EMAIL:%ce%nCOMMITTED_DATE:%ai%nCOMMIT_MESSAGE:%B"'
            }
        }
    }
}
