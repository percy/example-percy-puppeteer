pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                parallel (
                    phase1: {
                        sh 'env'
                        sh 'git show HEAD --quiet --format="COMMIT_SHA:%H%nAUTHOR_NAME:%an%nAUTHOR_EMAIL:%ae%nCOMMITTER_NAME:%cn%nCOMMITTER_EMAIL:%ce%nCOMMITTED_DATE:%ai%nCOMMIT_MESSAGE:%B"'
                        sh 'git show HEAD^ --quiet --format="COMMIT_SHA:%H%nAUTHOR_NAME:%an%nAUTHOR_EMAIL:%ae%nCOMMITTER_NAME:%cn%nCOMMITTER_EMAIL:%ce%nCOMMITTED_DATE:%ai%nCOMMIT_MESSAGE:%B"'
                    },
                    phase2: {
                        sh 'env'
                        sh 'git show HEAD --quiet --format="COMMIT_SHA:%H%nAUTHOR_NAME:%an%nAUTHOR_EMAIL:%ae%nCOMMITTER_NAME:%cn%nCOMMITTER_EMAIL:%ce%nCOMMITTED_DATE:%ai%nCOMMIT_MESSAGE:%B"'
                        sh 'git show HEAD^ --quiet --format="COMMIT_SHA:%H%nAUTHOR_NAME:%an%nAUTHOR_EMAIL:%ae%nCOMMITTER_NAME:%cn%nCOMMITTER_EMAIL:%ce%nCOMMITTED_DATE:%ai%nCOMMIT_MESSAGE:%B"'
                    }
                )
            }
        }
    }
}
