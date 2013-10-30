# everything is an object (no integers)
# every operation is a method call on an object
# objects (classes?) have types, variables (instances?) don't
# everything happens at runtime (dynamic) (can add/modify code at runtime)
# conventions:
	# ClassNames
	# method_name
	# local_variable
	# CONSTANTS... assumes constant if it starts with capital letter (throws "warning" if you try to redefine it)
	# $global (not scoped)...	not recommended
	# @instance_variable...		not recommended
	# @@class_variable...		not recommended
# instance & class variables ==nil (until assigned)
# philosophy: if the parser can figure it out, you don't have to put all the syntax
# optional semicolon (newline denotes end of command)
	# commands may span multiple lines, but be careful (make sure the first line is not a legal statement by itself, or it will evaluate)
	# multiple commands on one line = use semicolon

########## "interactive" ruby shell (os x) ##########
$ irb
> x = 5

$ gem install rails		# for ruby = '$ npm install express' for server-side javascript (node.js)

########## comment ##########
=begin
multiline comment
=end

########## operators ##########
	==  !=  >  <  >=  <=
	!~  =~
	&&  ||  !
	+  -  *  %  **		# ** = exponential (^)
	true  false
		nil == false	# nil = the only ruby object that is false (besides 'false' itself)
		"" == true
		0 == true
		[] == true
		anything = true

myVar = # types: number, boolean, string

########## if/unless else  ##########
print str if str.length > 10
if no_parathesis == true
	# blah
elsif car > cat
	# blah
else
	# more blah
end

print str unless str.length <= 10
unless hungry == true	# same as: if hungry != true
	# blah
else
	# blah
end

name = param || default		# name = default if param == nil (else name = param)
tweets = timeline.tweets || []
def sign_in
	current_session || sign_user_in		# if (current_session) {current_session} else {sign_user_in}
end
def setme
	setme = param1		# might be nil
	setme ||= param2	# if nil, setme = param2
	setme ||= default	# if still nil, setme = default
end
# conditionals return values (every method in ruby returns a value)
setme = if param1
	param1
else
	default
end

########## case statements ##########
num = case str
	when "one"
		1
	when "two"
		2
	else
		nil
end
num = case str
	when "one"	then 1
	when "two"	then 2
	else 		nil
end
canDrink = case age
	when 0..20
		false
	when 21..110
		true
	else
		nil
end
num = case str
	when regex_decimal
		str.to_f
	when regex_int
		str.to_i
	else
		nil
end

########## loops  ##########
5.times {	# ... }
5.times do
	# ...
end

1.upto(10) {|i|		# arr[i]...}
1.upto(10) do |i|
	# arr[i]...
end

(1..5).each {|num| 	# num...}
(1..5).each do |num|
	# i...
end

hash.keys.each {|key|	# hash[key]...}
arr.each do |item|
	# item...
end

while isWorking == true
	# blah
end

until isWorking != true
	# blah
end


########## method ##########
def method_name(x,y=0)	# y is optional (default: y=0, if omitted)
	#return x + y 	# explicit return
	x + y 			# implicit return, every method in ruby returns a value (default: return last line)
end
z = method_name(2,3)
z = method_name 2, 3	# parenthesis optional

def method_name(x,y)
	return [x+1, y+1]
end
a,b = method_name(2,3)

stylesheet_link_tag "application", media: "all",
                                   "data-turbolinks-track" => true
#---------- same as ----------#
stylesheet_link_tag("application", { media: "all", "data-turbolinks-track" => true })
	# parenthesis optional
	# ignores newline (except when first line evaluates by itself)
	# can ignore curly braces when hash is last argument

########## class ##########
class ClassName
	attr_accessor :name, :age, :time...
	def method(...)
		...
	end
end
instVar = ClassName.new				# if no "initialize" method
instVar.name			# get
instVar.name = "tylor"	# set

class ClassName
	attr_accessor :name, :age, :time...
	def initialize(name, age)
		@time = Time.now
		@name, @age = name, age
	end
	#---------- another way ----------#
	def initialize(hash)
	#def initialize(hash = {})	# default = empty {}
		@time = Time.now
		@name, @age = hash[:name], hash[:age]
	end
end
instVar = ClassName.new(name, age)
instVar.name			# get
instVar.name = "tylor"	# set

# filename: word_class.rb
class Word < String 	# Word inherits from String
	def palindrome?
		self == self.reverse
	end
end
$ rails c 	# `$ rails console`
>> require './word_class' 	# optional .rb extension
>> word = Word.new
>> word = "www"
>> word.palindrome? => true
>> word.length => 3

class String 		# extending String class (inherits previous String's methods)
	def palindrome?
		self == self.reverse
	end
end
"abcba".palindrome? => true
"abcba".length => 5

########## string ##########
str = 'string' || %q{string}	# interprets string literally/explicitly
str = "string" || %Q{string}	# allows for code within string "string #{code}"
str = "string #{code}" = 'string ' + code
str = "x = #{3+2}" = 'x = 5'
double_quote = " \" double-quote, \\ (one) backslash, \# hash, \n newline, \r carriage return, \t tab, \a bell/alert, \b backspace, \s space"
'\n' ==> "\\n"	# '' automatically escape characters
't' * 10  ==>  "tttttttttt"
str.length
str.nil?	# == nil
str.empty?	# == ""
str.blank?	# == "", " ", "  ", ... (whitespace)	# rails, not native to ruby
str.reverse
str.match(regex)
str.upcase
str.downcase
str.swapcase
str.capitalize
str.capitalize! # short-hand for: str = str.capitalize
str.split		# returns array of string split on space ' ' (excluding the ' ')
str.split(',')	# comma delimited
str.strip		# remove leading/trailing whitespace
str.include? "find"
str.start_with? "tyl"
str.end_with? "lor"
str.ascii_only?
str * 3 = str + str + str	# concatenate
"40".to_i	# string to integer
40.to_s		# integer to string
"tylor hess"[1]		# .charAt(1)	0-based
	"y"
"tylor hess"[11]
	nil
"tylor hess"[3,5]	# str[start index (inclusive), length]
	"or he"
"tylor hess"[3..5]	# str[start index (inclusive), end index (inclusive)]
	"or "
str['find'] = 'replace'		# search str, find "find", replace with "replace" (only 1st instance); if success, return 'replace' string, else error
str.lines.to_a				# returns array of strings (1 string/item per line)
str.to_sym ==> :string

########## commend line ##########
print "string"		# prints "string" (returns nil)
puts "string"		# prints "string\n" = print line "string" (returns nil)
	string
	=> nil
p "string" == puts "string".inspect 		# inspect works with any object: string, array, symbol, ...
	"string"
	nil
gets.chomp			# gets command line text input, chomps off \n, \r, and \r\n from beginning and end of string

########## symbol ##########
# cheaper than string, similar to a string
# NOT a string (CANNOT: str = :symbol + "string")
sym = :string_like_object		# immutable/unchangeable string
sym.to_s => "string_like_object"
# Note: No spaces ' ' or dashes '-'

########## array ##########
arr = [1,'two',:three]
arr.push(4) == arr << 4	# append 4 to the end of the array
arr.first == arr[0]
arr.second == arr[1]
arr.last == arr[-1]
arr[3,5]	# arr[start index (inclusive), length]
arr[3..5]	# arr[start index (inclusive), end index (inclusive)]
arr.length
arr.max		# returns item (in array) with max value (error if different classes)
arr.reverse
arr.sort	# return sorted array
arr.sort!	# arr = arr.sort
arr.sort_by {|item| item.attr}.reverse
arr.shuffle	# random sort
arr.join	# concatenate all elements into 1 string (automatically item.to_s, if it isn't already a string)
arr.find_all{|item| item.isValid}
arr.select{|item| item.isValid}		# returns array of items that are valid
arr.map{|item| item.attr}			# return array of attr (instead of arr = array of items) 
arr.map{"tylor"}					# return array "tylor" (one for each item in array)
%w[a b c]		# array of strings (also: %w(a b c), %w|a b c|, %w\a b c\, %w{a b c}, %w?a b c?, %w@a b c@, ...)
	["a", "b", "c"]
%w[foo\ bar bang]		# might as well explicitly use ["foo bar", "bang"]
	["foo bar", "bang"]
('a'..'z').to_a.shuffle[0..7].join	# char a-z, ['a', ..., 'z'], random shuffle, first 8 elements, join (to string)
	"idksljez"		# 8 random characters

########## range ##########
0..9 ==> 0..9		# range object (not string: "0..9", etc.)
arr = (0..3).to_a 	# remember parenthesis
	[0,1,2,3]
a[2..(a.length-1)] == a[2..-1]
	[2,3]
('a'..'d').to_a
	["a", "b", "c", "d"]

########## hash (key-value pairs) ##########
hash = {}			# literal constructor
hash = Hash.new(0)	# named constructor sets default-value for non-existant keys (hash[:zyngx] => 0)... default default-value = nil
hash = {'key'=>'value',:key2=>'value2'}
hash = ('key'=>'value', key2:'value2') 		# >= ruby 1.9 (Note: when you use `key2:'value2'` syntax, :key2 is a symbol!)
hash['key'] || hash.key		# get
hash['key'] = 'value'		# set
hash.key = 'value'			# set
hash.length
hash.keys
	["key", :key2]
hash.values
	['value','value2']
hash.keys.each {|key| print hash[key]}

########## Regexp ##########
/.../ = %r[...] = Regexp.new("...")
/pattern/ = %r[pattern] = Regexp.new("pattern")

# ruby escaped characters
variable = "var"
/#{variable}/.match("varying")  ==> <MatchData "var">
/\u{6771 4eac 90fd}/.match("Go to 東京都")  ==> <MatchData "東京都">
\h 		# [0-9a-fA-F] = hexdigit character
\H 		# [^0-9a-fA-F] = non-hexdigit character
\A 		# start of string (used like a character)
\z 		# end of string (used like a character)

# match
/stack/.match('haystack')  ==> <MatchData "stack"> # MatchData object (like an array array)
						   ===> nil 	 # if no match found
# =~ operator
/stack/ =~ 'haystack'  ==> 3	# index of 's' in "haystack"
					   ==> nil 	# if no match found

/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i 	# simple "valid email" regex


########## MatchData ##########
matchData = str.match(regex) || regex.match(str)
also: str !~ regex || regex !~ str
matchData
	(MatchData object) || nil
matchData[0]
	str || nil
matchData[3,5]	# matchData[start index (inclusive), length]
matchData[3..5]	# matchData[start index (inclusive), end index (inclusive)]

########## %_[] ##########
%w[...] = %w(...) = %w{...} = %w|...| = %w\...\ = %w/.../ = %w?...? = %w@...@ = ...you can use many delimiters
%w[... ... ...] = ["...", "...", "..."] = "word array" = array of strings
%q[...] = '...' = single-quoted string (note: can be multi-line)
%Q[...] = "..." = double-quoted string
%r[...] = /.../ = regular expression
%p[...] = pattern
%x[...] = `$ ...` = shell command



########## Objects ##########
obj.class
	String # not "String"
obj.class.superclass.superclass...

str = "string"				# literal constructor
str = String.new("string")	# named constructor (don't use for strings and arrays)

obj.nil?
obj.dup		# duplicates object: sameObj = obj (sameObj is obj), newObj = obj.dup (newObj is NOT obj, their attributes just so happen to have the same value and stuff)
obj.clone	# similar to (but somehow different than) .dup
obj.respond_to?(:attrOrMethod)	# does obj.attrOrMethod work (true)? Throw exception (false)?

########## Directories ##########
Dir.entries		# returns array of directory entries [".", "..", "Home", ...]
Dir["/Home/*.txt"]	# [] = usually means "I'm looking for..." (in Ruby)

########## File ##########
print File.read("/fileName.txt")
File.mtime("/fileName.txt")		# returns Time object
File.foreach("/fileName.txt") do |line|		# for each line in fileName.txt
	# ...
end
File.open("/fileName.txt", "a") do |file|	# "a" = append mode
	file << "append this line"
end

########## FileUtils ##########
FileUtils.cp("/fileName.txt", "/Home/fileName.txt")

########## Time ##########
Time.now
Time.now.hour

########## Popup ##########
require 'popup'
Popup.make {
	h1 str
	p str
	list {
		p str
		p str
	}
	link name, url
}

########## railstutorial.org ##########
provide(:title, 'Home')		# var title = 'Home'
