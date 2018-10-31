%%%%% comments %%%%%
% = comment line
%{
	comment code segment
	weird: %{%}   NOT expected: %{}%
%}

%%%%% MATLAB Command Window %%%%%
command		% execute & print command to MATLAB Command Window
command;	% execute command & suppress printing to MATLAB Command Window
command line one ... 
line one continued;
cd ~/Code/matlab 	% change MATLAB Current Folder (change directory)
cd .. 				% parent folder
cmd+. 	% force quit matlab

% execute Matlab from command line (terminal)
% http://www.mathworks.com/help/matlab/ref/matlablinux.html
$ alias matlab = '/Applications/MATLAB_R2015a.app/bin/matlab'
$ matlab 
	>> ...
	>> quit|exit
$ matlab < filename.m 			% execute matlab file
$ matlab -r "X = [1 1 1 1]"		% execute matlab command(s?)
$ matlab -logfile output_filename.txt % Copy Command Window output, including error reports, into filename, specified as a string.
% Recommended by mathworks.com:
$ matlab -nojvm -nodisplay -nosplash % -nojvm = no Java Virtual Machine (JVM) = no desktop, no graphics
% Example 1:
$ matlab -nojvm -nodisplay -nosplash -logfile out.txt -r "fprintf(1, 'value: %f\n', 2.0); quit;" 	%-r "rand(3), quit" 
% Example 2:
$ ./bashscript.sh
	#!/bin/sh
	matlab -nojvm -nodisplay -nosplash -logfile out.txt < matlabfile.m
	matlab -nojvm -nodisplay -nosplash -logfile out.txt -r "generateJson(182,292,401,380);quit"
	
	wait $(ps | grep matlab | awk '{print $2}') && cat out.txt

% stdin/stdout
str = input('', 's'); 	% input reads from stin
fprintf(str); 			% fprintf outputs to stdout

% MATLAB Command Window >> operating system command line
% MATLAB Command Window as Terminal (for OS X) to execute bash commands 
! execute command in shell
! pwd 	
	/Users/tylor/Code/matlab 	% returns response to MATLAB Command Window
! touch deleteme.txt

%%%%% stand-alone commands %%%%%
clear()		% clear workspace variables (bottom-left-hand corner)   % WARNING! clears function arguments/parameters, if used in a function
clc()       % clear command window
clf()       % clear figures
close all 	% close all figure windows (except imtool figures)
imtool close all % close all imtool figure windows
workspace 		% ensure Workspace (variables) are showing
format('short')	% (default) number formating
format long		% show more decimals
colormap jet 	% jet|hsv|hot|cool|spring|summer|autumn|winter|lines|gray|bone|copper|pink (default=jet)
caxis([min max])% color axis = sets min/max values = start/end of color spectrum
caxis auto 		% (default)
shading flat 	% removes gridlines on a 3D surface
fontSize 20

% relational/boolean operators 
> < >= <= % greater/less than (or equal to)
a == b	  % boolean equals (real and imaginary)
a ~= b 	  % boolean NOT equals (real and imaginary)
~(isTrue) % == isNotTrue == isFalse
&   |     % normal/default logical operators (scalars & arrays)
&&  ||    % short circuit  logical operators (scalar-only)
	expr1 && expr2  % short circuit: if expr1 == false (0), expr2 not evaluated
	expr1 || expr2  % short circuit: if expr1 == true  (1), expr2 not evaluated

%%%%% char (strings & characters) %%%%%
char() 		
	class('string') == char 	% no string class (char is the string class)
	""  <-- NOT a special character 
	['con','cat','enate'] = 'concatenate'
	'a quote ('') within a quote requires an extra quote to escape it'
sprintf();	% formats data/string into string
	sprintf('line1\nline2') ------------> 'line1'
	'line1\nline2' --> 'line1\nline2'     'line2'

% escape characters
'tylor''s name' --> % tylor's name
cd /Users/tylor/Dropbox' (MIT)'/tylor' (Dropbox MIT)'/Code/matlab/

%%%%% scalar math %%%%%
% careful not to name variables the same as filenames in your project folder, or it will try to call them like functions
x = 1.0  % variable = value;
x+y  x-y  x*y  x/y 
(a+b-c*d)/e % math
cos(x) sin(y)
sqrt(x)
sqrt(-1) == i == j

% floating point (can be real or imaginary)
double()	% <-- default class for numbers (and sometimes other things, like cell arrays)
	realmin('double') == 2.2251e-308
	realmax('double') == 1.7977e+308
single() 	% floating point single
	realmin('single') == 1.1755e-38
	realmax('single') == 3.4028e+38
% integers (can be real or imaginary)
int8() 							uint8() 	% signed/unsigned integers
	intmin('int8') == -128		intmin('uint8') == 0
	intmax('int8') ==  127		intmax('uint8') == 255
int16() 						uint16() 
	intmin('int16') == -32768	intmin('uint16') == 0
	intmax('int16') ==  32767	intmax('uint16') == 65535
int32() 						uint32() 
int64() 						uint64()
logical() 	% binary 0/1 ~= boolean false/true
	0 or 1
	false = 0
	true  = 1
	A && B
	A || B
	~(isTrue) == isFalse


%%%%%%%%%% matrices (arrays) %%%%%%%%%%
[] = matrix (array)
class([]) 		% matrices/arrays are numbers
	>> double
x == [x]		% numbers == matrices/array
	>> true

% set matrix
A = [a,b,c;		% set matrix value (many)
	 d,e,f]
row = 1:3 == [1 2 3]
row = 1:2:6 == [1 3 5]	% row = min:step:max
row = 6:-2:1 == [6 4 2]
row = 0:.5:1 == [0 .5 1]
row = 1:-1:end
col = [1; 2; 3]
A(i,j) = x 		% a_ij = x
A(2,3) = x 		% set matrix value
A(6) = A(2,3) 	% can treat 2x3 matrix as 1D array 

% get matrix
A == A(:,:)	% get entire matrix
A(i,j)	% get element a_ij
A(2,3) 	% get single value
A(3,:) 	% get row 3
A(:,2)	% get col 2
A(3:–1:1,2:–1:1)	% A(n:–1:1,n:–1:1) reverses A
	>> [f,e,d;
		c,b,a]
A(1:2:end,end:-2:1)	% no 'start' command (use 1)

% matrix concatenation
A = [1 2;		B = [5 6;
	 3 4]			 7 8]
C = [A; B] = vertcat(A,B) == cat(1,A,B)	 % concat in the 1st dimension (horizontal)
	>> [1 2;
	    3 4;
	    5 6;
	    7 8]
C = [A, B] == horzcat(A,B) == cat(2,A,B) % concat in the 2nd dimension (vertical)
	>> [1 2 5 6;
	    3 4 7 8]
C = cat(3,A,B)							 % concat in the 3rd dimension (stack)
	C(:,:,1) >> [1 2;  C(:,:,2) >> [5 6;
				 3 4]				7 8]
C = cat(n,A,B,...) 	% concatenate A,B,... in the n-th dimension

% matrix operations
A' 	% matrix transpose (complex conjugate)
A.' % matrix transpose (nonconjugate)
row' = col 	% transpose
col' = row 	% transpose
inv(A)	% matrix inverse
diag(A)	% get diagonal elements of A (as column vector
numel(A)	% number of elements
ndims(A)	% number of dimensions
	>> 2
	>> k
size(A)		% row vector of dimension lengths
	>> [m n]		% for a 2D matrix (m x n)
	>> [m n ... k] 	% for a k-dimensional matrix (m x n x ... x k)
	size(0) >> [0 0]
	size(double) >> [1 1]
length(A)	% length of longest dimension
	length(A) == max(size(A))
isvector(A)	% true if row/col vector
isrow(A)	% true if row vector
iscolumn(A)	% true if column vector
isempty(A)	% true if []


% matrix-scalar math
10+A 		% (a_ii) + 10 
A-10 		% (a_ii) - 10 
4*A			% (a_ii) x 4
A/2 		% (a_ii) / 2
A^3 		% (a_ii)^3
power(A,3)  % (a_ii)^3
sin(A) 		% sin(a_ii)

% matrix operations 
A*B 	% matrix product: sum(products(row A & column B))   (colmuns of A must = rows of B)
A/B 	% matrix right divide (mrdivide): Ax=B > x=B/A > B/A = (A'\B')'
A\B 	% matrix left  divide (mldivide): Ax=B > x=A\B > A\B=inv(A)B (but that's not hot it's solved, solved using RC?)
A^B 	% involves eigenvalues & eigenvectors
A' 		% matrix transpose (complex conjugate)

% array operations (element-by-element)
A+B 		% (a_ii) + (b_ii)
A-B 		% (a_ii) - (b_ii)
A.*B 		% (a_ii) * (b_ii)
A./B 		% (a_ii) / (b_ii)
A.\B 		% (b_ii) / (a_ii)
A.^B 		% (a_ii)^(b_ii)
power(A,B) 	% (a_ii)^(b_ii)
A.' 		% transpose (nonconjugate)

% create matrices 
% square-only
eye(n)		% identity matrix
diag(v)		% diagonal matrix (zero matrix except diagonal), v = row/column vector
meshgrid(1:3) = [1 2 3;
				 1 2 3;
				 1 2 3]
blkdiag(A,b) = [A A 0;	% block diagonal matrix
				A A 0;
				0 0 b]
% rectangular or square (m x n) (row x column)
zeros(n)	% square zeros matrix (double)
zeros(m,n)	% zeros matrix (double)
false(m,n)	% zeros matrix (logical)
ones(m,n)	% ones matrix (double)
true(m,n)	% ones matrix (logical)
rand(m,n)	% random 0-1 (double)
% row vectors
1:n
n:-1:1
linspace(a,b)	% row vector of 100 uniformly distributed points between a & b (inclusive)
linspace(a,b,n) % row vector of  n  uniformly distributed points between a & b (inclusive)
logspace(a,b)	% row vector of 100 logarithmically distributed points between a & b (inclusive)
logspace(a,b,n) % row vector of  n  logarithmically distributed points between a & b (inclusive)
% ??? 
accumarray	Construct array with accumulation
freqspace	Frequency spacing for frequency response
meshgrid	Rectangular grid in 2-D and 3-D space
ndgrid		Rectangular grid in N-D space
circshift	Shift array circularly
ctranspose	Complex conjugate transpose
flip		Flip order of elements
fliplr		Flip array left to right
flipud		Flip array up to down
ipermute	Inverse permute dimensions of N-D array
permute		Rearrange dimensions of N-D array
repelem		Repeat copies of array elements
repmat		Repeat copies of array
reshape		Reshape array
rot90		Rotate array 90 degrees
shiftdim	Shift dimensions
issorted	Determine whether set elements are in sorted order
sort		Sort array elements
sortrows	Sort array rows
squeeze		Remove singleton dimensions
vectorize	Vectorize expression


%%%%%%%%%% cell (arrays) %%%%%%%%%%
{} = cell (array)
class({})
	>> cell

% matrix for same class (fixed-dimension arrays)
% cell for different classes (fixed-dimension arrays)
c = {1.0,uint8(1),'one';	% create cell array
	 2.0,uint8(2),'two'}
c{2,3} = x					% set cell array value
empty_array = cell( m, n, ... ) 	% (m x n x ...) array contain empty [] (1x1 matrix, class = double)

% get cell (array)
c == c{:,:}	% get entire cell array
c{2,3}		% get cell value
c{i,j}		% get element c_ij
c{2,:}		% get row 2
c{:,3}		% get col 3
... 		% same as matrix
c(i,j)		% parenthesis do the same thing (I think)

% cell (array) concatenation
a = {1 2;		cb = {5 6;
	 3 4}			  7 8}
c = [a; b] = vertcat(a,b) == cat(1,a,b)	 % concat in the 1st dimension (horizontal)
	>> [1 2;
	    3 4;
	    5 6;
	    7 8]
c = [a, b] == horzcat(a,b) == cat(2,a,b) % concat in the 2nd dimension (vertical)
	>> [1 2 5 6;
	    3 4 7 8]
c = cat(3,a,b)							 % concat in the 3rd dimension (stack)
	c(:,:,1) >> [1 2;  c(:,:,2) >> [5 6;
				 3 4]				7 8]
c = cat(n,a,b,...) 	% concatenate a,b,... in the n-th dimension

% nesting cell arrays
c = {a; b}
	>> c = {{a};
	        {b}}
c = {a, b}
	>> c = {{a}, {b}}

% cell (array operations)
c'	% transpose
length(c)	% length of longest dimension
size(c)		% row vector of dimension lengths
ndims(c)	% number of dimensions
numel(c)	% number of elements

% NO MATH
CAN NOT do 2*c



%%%%% struct %%%%%
% get
s.fieldname     % fieldname must begin with a letter (can have: letters, digits, and underscores). Max length is the value `namelengthmax` function returns.
s.('fieldname') 
% set
s.fieldname = value
s.('fieldname') = value
s = struct('fieldname', value)
s = struct('field1',value1,...,'fieldN',valueN)


%%%%% functions %%%%%
% careful not to name variables the same as filenames in your project folder, or it will try to call them like functions
% one file for each function (filename == function_name)
% if filename != function_name, use filename to call function_name
% only first function (main function) in file can be called from command line or other files in project folder
% 	additional functions are local-only

% no output (filename: function_name.m)
function function_name(arg1, ..., argN)
	commands involving arg1, ..., argN;
end
function [] = function_name(arg1, ..., argN)
	commands involving arg1, ..., argN;
end
% one output (filename: function_name.m)
function return_variable = function_name(arg1, ..., argN)
	commands involving arg1, ..., argN;
	return_variable = return_value;
end
% multiple output (filename: function_name.m)
function [A,B] = function_name(arg1, ..., argN)
	commands involving arg1, ..., argN;
	A = return_value_A;
	B = return_value_B;
end

% local functions
func(arg1,arg2)
@function_name 	% function handle
% variable = function
variable_name = @function_name	
	sine = @sin
		sine(pi) == 0
% variable = anonymous functions
variable_name = @(arg1, ..., argN) command involving arg1, ..., argN;
	curt = @(x) x.^(1/3); 	% defining "cubed root" funtion
		curt(8) == 2

% lazy evaluation
foo = @() 1+1 		% anonymous function
bar=@()foo()*foo() 	% evaluates foo twice
% "traditional" evaluation
foo=1+1		% evaluates foo once
bar=foo+foo

% temporary global function
addpath('/path/to/folder') % folder containing file "function_name.m"
addpath('/Users/tylor/Dropbox (MIT)/tylor (Dropbox MIT)/Code/matlab/jsonlab')
addpath(genpath('c:/matlab/myfiles')) % adds folders and sub-folders

% permanent global function
pathtool % GUI permanently
addpath + savepath

%%%%% class %%%%%
class(x)	% = typeof() in javascript




% plot
plot(x,y)
	plot(x,y,'r--')
	plot(x,y,'red') % color
	plot(x,y,'+') 	% + | o
	xlabel('time')
	ylabel('sin(t)')
	title('Sine Function')

plot(x1,y1)
hold on
plot(x2,y2)
	legend('y1','y2')

% log
loglog(x,y)

% 3D
surf(X,Y,Z) % 3D surface
mesh()

% save/load workspace variables (bottom-left-hand corner)
save filename.mat
load filename.mat



% script
edit filename 	% opens (and creates?) filename.m
filename 		% executes file

% conditional
if x < 10
   % code
elseif x < 100
   % code
else
   % code
end

% for loop (1-indexed, not 0-index, means arrays/matrices start at 1, not 0)
for i = 1:100
	% code
end

%%%%%%%%%% Matfiles (.mat) %%%%%%%%%%
% Matfiles (.mat) = Workspace variables saved to harddisk (files) from memory (Workspace)
save('filename.mat'); % (all) workspace variables --> 'filename.mat'
load('filename.mat'); % 'filename.mat' --> workspace variables
	save('filename.mat', 'var1', 'var2', '...') % only save var1, var2, ... to 'filename.mat'
	save  filename.mat    var1    var2    ... 	% same thing, just easier
myMat = matfile('filename.mat')
	myMat.var1, myMat.var2, ... 
who(myMat) --> ['var1' 'var2' '...']

%%%%%%%%%% Image Processing Toolbox %%%%%%%%%%
% image import, export, convert (.png --> .jpg)
% display, interact with image
% crop, scale, rotate, transform image
% color conversion (RGB --> BW or grayscale)
% image analytics: region analysis, texture analysis, image/pixel statistics
% spatial referencing/information
% image registration (autmatic or control point)

isIptInstalled = license('test', 'image_toolbox'); % is Image Processing Toolbox installed?

% read/write image
RGB = imread('image.jpg')
imwrite(RGB, 'output.png') 	% (.png)
imwrite(RGB, 'output.png', 'jpg|gif|...')
imfinfo('filename.gif')	% get file info

% display image
imshow(RGB)

% crop image
rect = getrect		 		% waits for user to draw rectangle [xmin ymin width height]
RGB = imcrop(RGB, rect)
% scale/resize image
RGB = imresize(RGB, 0.9) 	% 90% resize

% RGB (n x n x 3) --> grayscale G (n x n)
G = rgb2gray(RGB)
% grayscale --> black/white
threshold = graythresh(G);	% automatically calculates 
BW = im2bw(G, threshold);	% grayscale --> black/white = binary/logical (0/1)

G = imcomplement 	% image negative (255-intensity), inverts surface: peaks --> valleys, valleys --> peaks
G = imadjust(G)		% stretch image intensity to fill entire range: 0-255 (min gray to 0 (black), max gray to 255 (white))
G = histeq(G)		% histogram equalization (improves contrast)

% image analytics
imhist(G)			% histogram of grayscale
[centers, radii, metric] = imfindcircles(
	G, 						% grayscale image
	[rMin rMax], 			% min/max circle radius, 
	'Sensitivity', 0.88, 	% (default:0.85) 0-1, higher --> more circles
	'Method', 'TwoStage', 	% (default:PhaseCode)|TwoStage
	'ObjectPolarity', 'dark' % (default:bright)|dark, bright/dark = white/black circles
	'EdgeThreshold', 0.5 	% (default:0.5) 0-1, edge gradient threshold, 0/1 = min/max gradient
	);

imdistline

% CutImage stuff
load CutImage1 					% why not use rgb2gray?
R = CutImage(20:520,10:810,1);	% crop R
G = CutImage(20:520,10:810,2);	% crop G
B = CutImage(20:520,10:810,3);	% crop B
G = (R+G+B)/3;					% RGB --> grayscale

%%%%%%%%%% Computer Vision System Toolbox %%%%%%%%%%
% video import, export, format color space, convert, display, annotate
% feature detection/extraction: image registration, interest point detection, extracting feature descriptors, point feature matching
% object detection, recognition, block matching, background estimation, bag of features
% object tracking, motion estimation, optical flow, activity recognition
% single/stero camera calibration
% stereo vision: rectification, depth estimation, triangulation
% structure from motion (2D images --> 3D reconstruction)
% 3D point cloud processing: downsampling, denoising, transform, visualize, register, fit geometrical shapes of 3D point clouds
% analysis and enhancements: statistics, FIR filtering, frequency and Hough transforms, morphology, contrast enhancement, noise removal


%%%%%%%%%% jsonlab %%%%%%%%%% 
% newer (v1.2): https://github.com/fangq/jsonlab
% older (v1.0): http://iso2mesh.sourceforge.net/cgi-bin/index.cgi?jsonlab
addpath('/Users/tylor/Dropbox (MIT)/tylor (Dropbox MIT)/Code/matlab/jsonlab/'); % temporarily (for current matlab session)
savepath % permanently
pathtool % GUI permanently

%%%% loadjson (JSON --> MATLAB) %%%%
obj = loadjson('file.json'); % filename 
obj = loadjson('{"b":1}');   % json
%loadjson: options
loadjson(string,options) % if (string has '{' or '['), then string interpretted as json, else
loadjson(string,'option1',value1,'option2',value2,...)
%		  json 				   matlab
loadjson('{...}'         ) >>  struct()   
loadjson('[...]'         ) >>  {...} cell 
loadjson('{"a":{...}   }') >>  a: struct()
loadjson('{"a":[...]   }') >>  a: {...} cell
loadjson('{"a":null    }') >>  a: [] empty matrix
loadjson('{"a":true    }') >>  a: 1 logical
loadjson('{"a":false   }') >>  a: 0 logical
loadjson('{"a":"_NaN_" }') >>  a: NaN
loadjson('{"a":"_Inf_" }') >>  a: Inf
loadjson('{"a":"-_Inf_"}') >>  a:-Inf
loadjson('{}')   >> % Error using loadjson (line #). Input file does not exist
loadjson('[]')   >> % Error using loadjson (line #). Input file does not exist
loadjson('[[]]') >> % Error using reshape. Size arguments must be real integers...
loadjson('[1,2]')         >> 1 2 % row matrix
loadjson('[[1],[2]]')     >> 1   % column matrix
							 2
loadjson('[[1,2],[3,4]]') >> 1 2 % square matrix
							 3 4

%%%% savejson (MATLAB --> JSON) %%%%
string = savejson('',obj) % obj  = MATLAB object (cell, struct, matrix of cells/structs/doubles/...)
string = savejson('',obj,'ParseLogical',1) % common
% savejson: root
savejson(root,obj) % root = parent object to nest `obj` in
savejson('' , ...) >>      '...'
savejson('a', ...) >> '{"a":...}'
%			 matlab  matlab 		  json 				  javascript
savejson('a',struct) struct()     >> '{"a":{...}   }' >>  obj.a --> {...} % Object
savejson('a',{...} ) cell         >> '{"a":[...]   }' >>  obj.a --> [...] % Array
savejson('a',[...] ) matrix       >> '{"a":[...]   }' >>  obj.a --> [...] % Array
savejson('a',[]    ) empty matrix >> '{"a":null    }' >>  obj.a --> null  % (valid json)
savejson('a',1     ) logical      >> '{"a":true    }' >>  obj.a --> true  % Boolean (only if: 'ParseLogical' = 1)
savejson('a',0     ) logical      >> '{"a":false   }' >>  obj.a --> false % Boolean (only if: 'ParseLogical' = 1)
savejson('a',NaN   )              >> '{"a":"_NaN_" }' >>  obj.a --> '_NaN_'  % NaN       is NOT valid json
savejson('a',Inf   )              >> '{"a":"_Inf_" }' >>  obj.a --> '_Inf_'  % Infinity  is NOT valid json
savejson('a',-Inf  )              >> '{"a":"-_Inf_"}' >>  obj.a --> '-_Inf_' % -Infinity is NOT valid json
% save json: options														 % undefined is NOT valid json
savejson(root,obj,'file.json') 				 % filename
savejson(root,obj,'FileName','file.json',...)% options
savejson(root,obj, options)			 		 % options
	options = struct()
	options.FileName     = 'file.json'
	options.ParseLogical = (0) % javascript Boolean --> matlab Logical --> javascript Number (0|1)
	options.ParseLogical =  1  % javascript Boolean --> matlab Logical --> javascript Boolean
	options.SingletArray = (0) % (drops Array) javascript Array with 1 Number|Boolean --> matlab Matrix --> javascript Number|Boolean 
	options.SingletArray =  1  % (adds Array)  javascript Number|Boolean              --> matlab Matrix --> javascript Array with 1 Number|Boolean
	options.Compact      = (0) % use whitespace (newlines, tabs, ...)
	options.Compact      =  1  % don't use whitespace (newlines, tabs, ...)

%%%%%%%%%% loadjson --> savejson %%%%%%%%%% 
% pass: any length [Array] of: `null`, [String], or not-empty [Object]
loadjson('{"a":null   }'); savejson('',ans) >> {'a':null   } % correct
loadjson('{"a":[{...}]}'); savejson('',ans) >> {'a':[{...}]} % correct
loadjson('{"a":[null] }'); savejson('',ans) >> {'a':[null] } % correct
loadjson('{"a":["z"]  }'); savejson('',ans) >> {'a':['z']  } % correct
loadjson('{"a":[]     }'); savejson('',ans) >> {'a':[]     } % correct
% valid json escape characters
loadjson('{"a":"a/b"  }'); savejson('',ans) >> {'a':'a\/b' } % !!! unexpected !!! escapes: \", \\, and \/ <-- valid json (but \/ isn't necessary, thus unexpected)
% fail: single-element [Array] of: [Boolean], [Number], or empty [Object]
loadjson('{"a":[true] }'); savejson('',ans) >> {'a':true   } % !!! incorrect !!!
loadjson('{"a":[7]    }'); savejson('',ans) >> {'a':7      } % !!! incorrect !!!
loadjson('{"a":[{}]   }'); savejson('',ans) >> {'a':null   } % !!! incorrect !!!

 

%%%%%%%%%% 2.737 %%%%%%%%%%
% transfer function
tf = tf(10, [5 1]);	% H(s) = 10 / (5s + 1)
step(tf);		% plot transfer function's response to a step input (time domain)
pzmap(tf);		% plot poles and zeros (s-plane = frequency domain?)
rlocus(tf);		% plots Root Locus (how poles and zeros move on s-plane, as your vary 1 parameter)
bode(tf);		% plot Bode Plot: (1) Amplitude as a function of frequency, (2) Phase as a function of frequency (frequency domain)
	[mag,phase,w] = bode(tf)	% "omega" (w) = frequency
	loglog(w,mag(:,:))			% same as: loglog(w,squeeze(mag))
	semilogx(w,phase(:,:))		% same as: semilogx(w,squeeze(phase))
margin(tf);		% plots Bode Plot; shows where magnitude of 1 and corresponding phase (margin)
nyquist(tf);
sisotool(tf);	% "Single-Input, Single-Output" (SISO) Tool

%%%%%%%%%% 18.085 %%%%%%%%%%
% K = second difference matrix, stiffness matrix
K = toeplitz([2 -1 zeros(1,n-2)]);
	 2    -1     0     0
	-1     2    -1     0
	 0    -1     2    -1
	 0     0    -1     2
% C = circulant matrix, periodic matrix, cyclic convolution
C = toeplitz([2 -1 zeros(1,n-3) -1]);
     2    -1     0    -1
    -1     2    -1     0
     0    -1     2    -1
    -1     0    -1     2
% T = "top"
% T = K, except first 2 --> 1
T = toeplitz([2 -1 zeros(1,n-2)]);
T(1,1) = 1;
     1    -1     0     0
    -1     2    -1     0
     0    -1     2    -1
     0     0    -1     2
% B = and "bottom", boundary conditions
% B = K, except first & last 2 --> 1
B = toeplitz([2 -1 zeros(1,n-2)]);
B(1,1) = 1;
B(n,n) = 1;
     1    -1     0     0
    -1     2    -1     0
     0    -1     2    -1
     0     0    -1     1

% upper triangular 
triu(ones(n));

% first difference (forward)
	A = sparse(1:n,1:n,zeros(1,n),n,n);
	B = sparse(2:n,1:n-1,ones(1,n-1),n,n);
	forwardDiff = A+B+A';
% first difference (centered)
	A = sparse(1:n-1,2:n,ones(1,n-1),n,n);      %top
	B = sparse(1:n,1:n,zeros(1,n),n,n);
	C = sparse(2:n,1:n-1,-1*ones(1,n-1),n,n);   %bottom
	centerDiff = A+B+C;
% second difference
	% K
	

% tool tip digits (didn't work for bode plot)
/Applications/MATLAB_R2014a.app/toolbox/matlab/graphics/\@graphics/\@datacursor/default_getDatatipText.m
	line 31: DEFAULT_DIGITS = 4;
