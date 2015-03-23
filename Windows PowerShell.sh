# install PowerShell (if it isn't already)
#	if Windows 7 or greater, Windows PowerShell comes pre-installed
#	else, install online

# allow .ps1 scripts to execute
#	Start > type "Windows PowerShell" > right-click Windows PowerShell icon > "Run as administrator"
#		C:\Windows\system32> Get-ExecutionPolicy
#		Restricted
#		C:\Windows\system32> Set-ExecutionPolicy RemoteSigned
#			Restricted = cant run .ps1 scripts
#			AllSigned = can only run digitally signed .ps1 scripts
#			RemoteSigned = runs .ps1 scripts except unsigned scripts downloaded from the internet

# create shortcut to .ps1 file to allow scripts to execute on double-click
#	right-click > New > Shortcut
#		powershell.exe -command "& 'C:\A path with spaces\MyScript.ps1' -MyArguments blah"

$var = "string"
# = comment
Write-Host $var = write $var to command line
Read-Host "..." = write "..." to command line & prompt user input
Get-Date = string
Set-Date "7/30/2014 1:00 AM" # need to "Run as administrator"
Invoke-Item "D:\folder\file.exe"

Try
{
	# something
}
Catch
{
	# on error, run this
	break # to terminate on error
}
Finally
{
	# always run this
}