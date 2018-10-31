clear
close all

% Object Tracking: Differencing Two Frames
frame0 = imread('image_000012.jpg');
frame1 = imread('image_000007.jpg');

image_000000_rect = [172   93  872  686];
frame0 = imcrop(frame0, image_000000_rect);
frame1 = imcrop(frame1, image_000000_rect);
frame0 = imresize(frame0, 0.5);
frame1 = imresize(frame1, 0.5);

frame0 = rgb2gray(frame0);
frame1 = rgb2gray(frame1);

frame0 = imadjust(frame0);
frame1 = imadjust(frame1);

diff = imabsdiff(frame0, frame1);
diff = imadjust(diff);
%threshold = graythresh(diff);
%diff = im2bw(diff, threshold);



figure
imshow(frame1);
figure
imshow(diff);

figure
surf(double(diff(1:20:end,:)))
