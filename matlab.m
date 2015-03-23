% = comment

command;	% execute command
command		% execute & print command (to Command Window)

clear();    % clear variables
clc();      % clear command window
clf();      % clear figures
close all;	% close all (figure?) windows

x = 1;		% variable (not "var x = 1;")
x = sqrt(4);

format('long');		% show more decimals (default: 'short')



% matrix
M = [ 2 -1 0 ; -1 2 -1 ; 0 -1 2 ];
row = minInt:maxInt;			% row = [minInt minInt+1 ... maxInt-1 maxInt]; (default step size = 1)
row = minNum:stepSize:maxNum;	% row = [minNum minNum+stepSize ... maxNum-stepSize maxNum];
zeros(n,m);		% zeros matrix (all zeros): n x m matrix (rows x columns)
ones(n,m);		% ones matrix  (all ones):  n x m matrix (rows x columns)
eye(n);			% identity matrix: n x n

% plot
plot(x,y)
	plot(x,y,'red')
	plot(x,y,'o')
	plot(x,y,'+')
loglog(x,y)

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
K = toeplitz([2 -1 zeros (1,n-2)]);
	 2    -1     0     0
	-1     2    -1     0
	 0    -1     2    -1
	 0     0    -1     2
% C = circulant matrix, periodic matrix, cyclic convolution
C = toeplitz([2 -1 zeros (1,n-3) -1]);
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
