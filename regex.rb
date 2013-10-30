/.../	# default: first-only, case sensitve, ...
/.../g 	# global
/.../i 	# ignore case
/.../gi # global, ignore case



# single characters
.		# any (single) character (except line breaks if dotall is false)
	/./		# first character
	/./g	# array of single characters
	/.+/	# first line (dotall is false), everything (dotall is true)
j 		# a specific character
	/j/		# first 'j'
	/j/g 	# array of all single 'j's
	/j+/	# first sequence of 'j's (or single 'j')
[aeiou]	# [a|e|i|o|u] = specific (single) characters ("character class")
	/[aeiou]/ 	# first (lowercase) vowel
	/[aeiou]/g 	# array of single vowels
	/[aeiou]+/	# first sequence of vowels (or single vowel)
[^-=]	# all (single) characters except "-" & "="
	/[^-=]/	# first non-("-" or "=") character
\w 		# [a-zA-Z0-9_] = "word" character = a (single) letter, number, or an underscore
	/\w/	# first alphanumeric/underscore character
	/\w/g 	# array of single alphanumeric/underscore characters
	/\w+/	# first word (until first non-alphanumeric/underscore)
\W 		# [^a-zA-Z0-9_] = non-"word" character = any (single) character that is not: a letter, number, or an underscore
	/\W/	# first non-word character
	/\W/g	# array of single, non-word characters
	/\W+/	# first sequence of non-word characters
\d 		# [0-9]	= digit character = a (single) number character
	/\d/ 	# first digit
	/\d/g 	# array of single digits
	/\d+/	# first number (series of digits)
\D 		# [^0-9] = non-digit character
\s 		# a whitespace character: space " ", tab "\t", new line "\n", carriage return "\r", vertical tab, form feed
\S 		# non-whitespace character
\b 		# word boundary = whitespace character or beginning/end of string
	/\bprefix/	# first occurrance of " prefix-abc" or "prefix-abc"
	/suffix\b/	# first occurance of "xyz-suffix " or "xyz-suffix"

# special characters
# have special meaning outside of character class \...[a-z]\
special: .   ^   $   |   *   +   ?   (   )   [   {   \
escaped: \.  \^  \$  \|  \*  \+  \?  \(  \)  \[  \{  \\
	.	# any single character
	^	# start of line (used like a character)
	$	# end of line (used like a character)
	a?	# optional 'a' = previous character (or character group) is optional (0 or 1)
	a+	# one or more 'a'
	a*	# zero or more 'a' = optional (?) + one or more (+)
	a{3}	# 'aaa'
	a{3,5}	# 'aaa', 'aaaa', 'aaaaa'
	a{3,}	# 'aaa', 'aaaa', 'aaaaa', ... (3 or more)
	(...)	# capture & return contents of parenthesis
	(a|b)	# a or b
# have special meaning inside of character class \abc[...]\
special: ]   ^   -   \
escaped: \]  \^  \-  \\
	[aeiou]
	[^xyz]	# any char except x, y, or z
	[a-zA-Z]# any (lowecase or capital) letter

# multiple characters
jqz 	# a specific sequence of characters
	/jqz/	# first 'jqz'
	/jqz/g 	# array of all 'jqz's
	/jqz+/	# first 'jqz', 'jqzz', 'jqzzz', ...
	/jqz?/	# first 'jq' or 'jqz'
j{5}	# 'jjjjj' = a character (or character class) repeated n times
	/[aeiou]{2}/	# first 2 vowel sequence
	/\w{8}/			# first 8 letter word
	/\d{3}-\d{3}-\d{4}/ # phone number (i.e. - 570-269-8807, ###-###-####)
j{3,5}	# 'jjj' or 'jjjj' or 'jjjjj'   (no space, NOT: j{3, 5} )
	/\w{4,6}/			# first 4-, 5-, or 6-letter word