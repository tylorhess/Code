# Amazon Mechanical Turk Tools

Requires:
	Amazon Web Services (AWS) account
	Amazon Mechanical Turk Requester account
		fund account:  http://requester.mturk.com > Account Settings > 

Download:
[mech-turk-tools] = ~/Downloads/Software/mech-turk-tools-1.3.0	# Command Line Tools Installation Directory

Visit: https://console.aws.amazon.com/iam/home#home
Create Group: AmazonMechanicalTurk # admin access
Create User: TylorHess

# Configure the Command Line Tools to use your AWS access identifiers information
[mech-turk-tools]/bin/mturk.properties
		access_key=2S44JYKSZZ3D44ETWF02 					# Example AWS Access Key
		secret_key=kl1GhCR9L9m0pw5bYR0+GyC1jsy5FdOg/B\xjM/A	# Example Secret Key

set MTURK_CMD_HOME environment variable to [mech-turk-tools]

# Configure Test/Production Environment
	[mech-turk-tools]/bin/mturk.properties
		# Test Environment (Sandbox)
			#service_url=http://mechanicalturk.amazonaws.com/?Service=AWSMechanicalTurkRequester
			service_url=http://mechanicalturk.sandbox.amazonaws.com/?Service=AWSMechanicalTurkRequester
		# Production Environment
			service_url=http://mechanicalturk.amazonaws.com/?Service=AWSMechanicalTurkRequester
			#service_url=http://mechanicalturk.sandbox.amazonaws.com/?Service=AWSMechanicalTurkRequester	
# OR temporarily override mturk.properties file configuration
	loadHITs -sandbox ...

[mech-turk-tools]/bin/loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -label ../samples/helloworld/helloworld -input ../samples/helloworld/helloworld.input -question ../samples/helloworld/helloworld.question -properties ../samples/helloworld/helloworld.properties 
