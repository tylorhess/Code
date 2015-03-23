# http://azure.microsoft.com/en-us/documentation/articles/virtual-machines-linux-tutorial/
1. manage.windowsazure.com
2. +New > Compute > Virtual Machine > From Gallery > Ubuntu Server XX.XX > 
	version release date: (choose latest)
	virtual machine name: MyTestVM1 (doesnt matter)
	tier: basic
	size: (choose smallest)
	new user name: NewUser1 (doesnt matter)
	(uncheck) upload ssh key
	(check)   provide password: Hackfit2014

	# can place virtual machines together in the cloud service or a single virtual machine
	cloud service: create a new cloud service
	cloud Service DNS Name: tylor	# tylor.cloudapp.net
	create a new cloud service: East US
	storage account: automatically generated storage account
	availability set: none
	endpoints: ssh		tcp		22		22

3. Vitual Machines > MyTestVM1 > SSH Details (or public VIP = public virtual IP)
	$ ssh NewUser1@191.238.58.242 	# IP from "public virtual IP" in MyTestVM1 dashboard
		#$ sudo apt-get install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
		$ sudo apt-get install git