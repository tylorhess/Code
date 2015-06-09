clear
close all

%%%%% Problem 1 %%%%%
% http://www.mathworks.com/help/vision/ug/local-feature-detection-and-extraction.html
%I0 = imread('circuit.png');
I0 = imread('image_000000.jpg');
image_000000_rect = [172   93  872  686];
I0 = imcrop(I0, image_000000_rect);
I0 = imresize(I0, 0.83);
I0 = rgb2gray(I0);
imshow(I0);


corners = detectSURFFeatures(I0);
%corners = detectFASTFeatures(I0,'MinContrast',0.1);
J = insertMarker(I0,corners.Location,'circle');
imshow(J);
%{

rect = getrect      % [xmin ymin width height]
I1 = imcrop(I0,rect);
imshow(I1);
pause(3);


corners = detectFASTFeatures(I1,'MinContrast',0.1);
J = insertMarker(I1,corners,'circle');
imshow(J);
%}

%{
I = imread('rice.jpg');
I = rgb2gray(I); % rgb --> grayscale
imshow(I);
corners = getrect
% corners = 
%}