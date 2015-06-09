clear
close all

% Object Tracking: Find Circles
for i = 21:175
    RGB = imread(['image_',sprintf('%06d',i),'.jpg']);

    image_000000_rect = [172   93  872  686];
    RGB = imcrop(RGB, image_000000_rect);
    RGB = imresize(RGB, 0.5);
    G = rgb2gray(RGB);
    G = imadjust(G);

    
    %rect = getrect; % [xmin ymin width height]
    r = 50;%int64((rect(3)+rect(4))/4);
    threshold = graythresh(G);
    [centers, radii, metric] = imfindcircles(G, [25 50], ...
        'Sensitivity', 0.88, ...
        'Method', 'TwoStage', ...
        'ObjectPolarity', 'dark' ...
        );
        %'EdgeThreshold', (threshold-0.05) ...
    figure(1)
    imshow(G);
    viscircles(centers, radii, 'EdgeColor', 'b');
    %figure(2)
    %surf(double(G(:,:)))
    %shading flat
    pause(0.01);
    %k = waitforbuttonpress
end
