clear
close all

i = 4
RGB = imread(['image_',sprintf('%06d',i),'.jpg']);
image_000000_rect = [172   93  872  686];
RGB = imcrop(RGB, image_000000_rect);
RGB = imresize(RGB, 0.5);
G = rgb2gray(RGB);
G = imadjust(G);

% morphological opening/closing
% open = darkens, white goes away, erosion 1st, use with black background
% closed = lightens, black goes away, dilate 1st, use with white background
%   (1) remove noise
%   (2) more-defined connected regions in black/white (binary) images, to 
%   perform region-detection on

% imopen: assumes rolling hills & deletes mountains that fit inside str. el
% imclose: assumes plateau & deletes valleys that fit inside struct. el.
% imopen(G) = same as flipping G, running imclose, & flipping it back
%   imopen(G) = imcomplement(imclose(imcomplement(G), se));

x = [10 10]
for i=1:50
    if x ~= 0
% structuring element
% struct. el. must be larger than (not able to fit into) feature (rice)
%radius = i;
%structuring_element = strel('disk',radius);
se1 = strel('disk',x(1,1));
se2 = strel('disk',x(1,2));
% SE = strel(shape, parameters)
% SE = strel('arbitrary', NHOOD)
% SE = strel('arbitrary', NHOOD, HEIGHT)
% SE = strel('ball', R, H, N)
% SE = strel('diamond', R)
% SE = strel('disk', R, N)
% SE = strel('line', LEN, DEG)
% SE = strel('octagon', R)
% SE = strel('pair', OFFSET)
% SE = strel('periodicline', P, V)
% SE = strel('rectangle', MN)
% SE = strel('square', W)

% remove white/peaks, preserve black/background
% I:            background = hill, rice = hill+100
% I_background: background = hill, rice = hill
G_open_close  = imclose(imopen(G, se1), se2);
G_close_open =  imopen(imclose(G, se1), se2);

% figure
% imshow(G_open)
% figure
% imshow(G_close)
figure(1)
title('open,close')
imshow(G_open_close)
figure(2)
surf(double(imcomplement(G_open_close)))
shading flat

figure(3)
title('close, open')
imshow(G_close_open)
figure(4)
surf(double(imcomplement(G_close_open)))
shading flat
%x = input(['r=',num2str(i),', continue?'])
x = input(['continue?'])
    end
end