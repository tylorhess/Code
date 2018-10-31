
% http://www.mathworks.com/matlabcentral/answers/46458-finding-a-part-of-an-image-using-convolution
%       2nd answer/comment
% https://youtu.be/Q-OzmDen4HU
function json_out = matchframes(x_min, y_min, x_width, y_height)

    %clc;    % Clear the command window.
    %close all;  % Close all figures (except those of imtool.)
    %imtool close all;  % Close all imtool figures.
    %clear;  % Erase all existing variables.
    %format longg;
    %format compact;
    
    % path should already be added
    %addpath('/Users/tylor/Dropbox (MIT)/tylor (Dropbox MIT)/Code/matlab/jsonlab/');

    % Object Tracking: Match Frames
    image_000000_crop = [172 93 872 686];
    firstFrame = true;
    for i = 1:205

        % Image Pre-processing
        %image = imread(['image_000004.jpg']);
        image = imread(['/Users/tylor/Dropbox (MIT)/tylor (Dropbox MIT)/ImageSequenceScroller/public/frames/image_',sprintf('%06d',i),'.jpg']);
        %image = imcrop(image, image_000000_crop);
        %image = imresize(image, 0.5);
        image = rgb2gray(image);
        image = imadjust(image);
        %image = image(:,end:-1:1);

        if (firstFrame)
            % If this is the first image...

            % Show the first image
            %figure(2);
            %figure(1);
            %imshow(image);

            % Prompt the user to draw a rectangle
            %Prompt = 'Please draw a rectangle on Figure 1.'
            %rect_original = (getrect); % [xmin ymin width height]
            rect_original = [x_min y_min x_width y_height];
            %Original = '------------------'
            image_sub_original = imcrop(image, rect_original);
            image_sub = image_sub_original;
            %figure(2)
            %imshow(image_sub);
            firstFrame = false;

            JSON(i, :) = rect_original;
        else
            % Now that we have the initial sub-image (drawn rectangle)
            % For all subsequent images...

            % 2D normalized cross-correlation coefficient matrix
            xcorr = normxcorr2(image_sub, image);
            %figure(3)
            %imshow(correlationOutput);

            % Find (x,y) position of peak correlation
            %[maxCorrValue, maxIndex] = max(abs(xcorr(:)));
            %[ypeak, xpeak] = ind2sub(size(xcorr),maxIndex(1));
            [ypeak xpeak] = find(xcorr==max(xcorr(:))); 


            %corr_offset = [(xpeak - size(image_sub,2)) (ypeak - size(image_sub,1))];
            %rect = [corr_offset(1) corr_offset(2) size(image_sub,2) size(image_sub,1)];
            corr_offset = [(xpeak - size(image_sub,2) + 1) (ypeak - size(image_sub,1) + 1)];
            rect = [(corr_offset(1)) (corr_offset(2)) (size(image_sub,2) - 1) (size(image_sub,1) - 1)];
            image_sub = imcrop(image, rect);
            image_sub = 0.5*image_sub + 0.5*image_sub_original;

            % Display image so that the image_sub is always stationary
            %rect_offset = round(rect - rect_original); % negative means new is to the left of original
            % x
            %   padarray (both sides) by abs(rect_offset)... x and y
            %   crop array on one side by 2*abs(rect_offset)... x and y
            % y 
            %   padarray (both sides) by abs(rect_offset)... x and y
            %   crop array on one side by 2*abs(rect_offset)... x and y

            %image = padarray(image, [rect_offset(2)+padding rect_offset(1)+padding]);
            %image = imcrop(image, [0 0 (length(image(1,:))-padding-rect_offset(2)) (length(image(:,1))-padding-rect_offset(1))]);
            %figure(1)
            
            %imshow(image)
            %rectangle('position',rect,'edgecolor','g','linewidth',2);
            
            %figure(2)
            %imshow(image_sub)

            JSON(i, :) = rect;
        end


        %pause(0.01);
        %k = waitforbuttonpress
    end

    json_str = savejson('',JSON);
    
    fileID = fopen('/Users/tylor/Dropbox (MIT)/tylor (Dropbox MIT)/ImageSequenceScroller/public/matlab_out.json','w'); % w = write permissions
    fprintf(fileID, json_str);
    fclose(fileID);
    
    json_out = json_str;
end