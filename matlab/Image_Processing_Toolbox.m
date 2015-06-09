clear
close all

%%%%%%%%%% Problem 1 %%%%%%%%%%
%{
I = imread('image_000001.jpg');
imshow(I);
I = rgb2gray(I);
imhist(I);
I2 = histeq(I);
imshow(I2);
%}

%%%%%%%%%% Problem 2 %%%%%%%%%%
% original 
I = imread('rice.jpg');
I = rgb2gray(I); % rgb --> grayscale

%{
load CutImage1
% CutImage --> RGB + crop --> I
R = CutImage(20:520,10:810,1);
G = CutImage(20:520,10:810,2);
B = CutImage(20:520,10:810,3);
I = (R+G+B)/3;
%}

%%%%% Problem 2: Preprocessing %%%%%

% str. el. must be larger than (not able to fit into) feature (rice)
structuring_element = strel('disk',50);
% remove white/peaks, preserve black/background
% I:            background = hill, rice = hill+100
% I_background: background = hill, rice = hill
I_background = imopen(I, structuring_element);
% morphological opening/closing
% open = darkens, white goes away, erosion 1st, use with black background
% closed = lightens, black goes away, dilate 1st, use with white background
%   (1) remove noise
%   (2) more-defined regions in grayscale (binary) images, to perform
%   region-detection on


% tries to set background to 0 by subtracting background from original
% I:             background = hill, rice = hill+100
% I_background:  background = hill, rice = hill
% I2 = I - I_bg: background = 0, rice = 100
I2 = I - I_background;

% contrast = stretch intensity to fill entire range (0-255)
% I2:          background = 0, rice = ~100 (max)
% I2_contrast: background = 0, rice = ~255 (max)
I2_contrast = imadjust(I2);

% create black/white (binary) image
threshold = graythresh(I2_contrast); % automagically computes b/w threshold
I_bw = im2bw(I2_contrast, threshold); % grayscale --> black/white
I_bw_open = bwareaopen(I_bw, 50);

%{
figure;
imshow(I);
figure;
imshow(I_background);
figure;
imshow(I2);
figure;
imshow(I2_contrast);
figure

imshow(I_bw);
figure
imshow(I_bw_open);
imshow(I_bw-I_bw_open)


figure
surf(double(I(1:10:end,1:10:end))),zlim([0 3*255]);
figure
surf(double(I_background(1:10:end,1:10:end))),zlim([0 255]);
figure
surf(double(I2(1:10:end,1:10:end))),zlim([0 255]);
figure
surf(double(I2_contrast(1:10:end,1:10:end))),zlim([0 255]);
%}

%%%%% Provlem 2: Analysis %%%%%
I = I_bw_open; % black/white image, intensity = binary value 0 or 1

% find all connected (white) components (black is background)
cc = bwconncomp(I,4)
cc.NumObjects

% view all grains
%{
for i=1:cc.NumObjects
    I_grain = false(size(I)); % creates all-black/0 image, same size as I
    I_grain(cc.PixelIdxList{i}) = true; % sets connected pixel group i = 1
    imshow(I_grain); 
end
%}

labeled = labelmatrix(cc);
colormaps = {'jet' 'hsv' 'hot' 'cool' 'spring' 'summer' 'autumn' 'winter' 'lines' 'gray' 'bone' 'copper' 'pink'};

for i=1:length(colormaps)
    RGB_label = label2rgb(labeled, char(colormaps(i)), 'w', 'shuffle');
    % label2rgb(labelmatrix, colormap, background_color, ???)
    imshow(RGB_label)
    %pause(0.5)
end


% get the basic properties of regions of connected components
graindata = regionprops(cc, 'basic') 
graindata(5).Area       % the area of the 5th region/connected component
graindata(5).Centroid   % the center of the 5th region
graindata(5).BoundingBox %the square box that bounds the 5th region

% find id of rice grain with smallest area
area_vector = [graindata.Area];
[min_area,idx] = min(area_vector)
% display rice grain with smallest area
I_grain = false(size(I)); % creates all-black/0 image, same size as I
I_grain(cc.PixelIdxList{idx}) = true; % sets connected pixel group i = 1
figure
imshow(I_grain); 


% Create histogram from vector of grain areas
nbins = 20; % number of (uniformly ditributed?) bins for histogram
figure
hist(area_vector, nbins)
title('Histogram of Rice Grain Area');