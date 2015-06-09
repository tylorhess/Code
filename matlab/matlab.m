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
a == b	% boolean equals (real and imaginary)
a ~= b 	% boolean NOT equals (real and imaginary)
&   |  	% element-wise
&&  ||	% short circuit

%%%%% char (strings & characters) %%%%%
char() 		
	class('string') == char 	% no string class (char is the string class)
	""  <-- NOT a special character 
	['con','cat','enate'] = 'concatenate'
	'a quote ('') within a quote requires an extra quote to escape it'
sprintf();	% formats data/string into string
	sprintf('line1\nline2') ------------> 'line1'
	'line1\nline2' --> 'line1\nline2'     'line2'

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
logical() 	% binary 0/1 (like java/javascript boolean false/true)
	0 or 1
	false = 0
	true  = 1
	A && B
	A || B


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
A(2,3) 	% get matrix value
A(i,j)	% get element a_ij
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
% set
s.fieldname = value
s.('fieldname') = value
s = struct('fieldname', value)
s = struct('field1',value1,...,'fieldN',valueN)
% get
s.fieldname
s.('fieldname')

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

% loops
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
isIptInstalled = license('test', 'image_toolbox'); % Image Processing Toolbox installed?

% read/write image
RGB = imread('image.jpg')
imwrite(RGB, 'output.png') 	% (.png)
imwrite(RGB, 'output.png', 'jpg|gif|...')
imfinfo('filename.gif')	% get file info

% CutImage stuff
load CutImage1
R = CutImage(20:520,10:810,1);	% crop R
G = CutImage(20:520,10:810,2);	% crop G
B = CutImage(20:520,10:810,3);	% crop B
G = (R+G+B)/3;					% RGB --> grayscale

% display image
imshow(G)


% RGB (n x n x 3) --> grayscale G (n x n)
G = grb2gray(RGB)
% grayscale --> black/white
threshold = graythresh(G);	% automatically calculates 
BW = im2bw(G, threshold);	% grayscale --> black/white = binary/logical (0/1)

% crop image
rect = getrect		 		% waits for user to draw rectangle [xmin ymin width height]
RGB = imcrop(RGB, rect)
% scale/resize image
RGB = imresize(RGB, 0.9) 	% 90% resize

G = imcomplement 	% image negative (255-intensity), inverts surface: peaks --> valleys, valleys --> peaks
G = imadjust(G)		% stretch image intensity to fill entire range: 0-255 (min gray to 0 (black), max gray to 255 (white))
G = histeq(G)		% histogram equalization (improves contrast)

%%%%% Analytics %%%%%
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

%%%%%%%%%% jsonlab %%%%%%%%%% 
% http://iso2mesh.sourceforge.net/cgi-bin/index.cgi?jsonlab
addpath('/Users/tylor/Dropbox (MIT)/tylor (Dropbox MIT)/Code/matlab/jsonlab/');
data = loadjson('filename.json')
>> {a:1}
savejson('',data)
>> {a:1}
savejson('ty',data)
>> {
	ty: {a:1}
   }

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
