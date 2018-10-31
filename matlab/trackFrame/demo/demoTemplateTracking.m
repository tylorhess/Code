function rects = demoTemplateTracking(images, first_rect)
	
	firstImage = true;
	numImages = length(images);
	for imageIndex = 1:numImages % for each image
		
		% preprocess each image before template tracking
		image = imread(images{imageIndex});
		image = rgb2gray(image);
        image = imadjust(image);
		
		if (firstImage)
			
			% get `first_template` (cropped image created from user-drawn rectangle)
			first_template = imcrop(image, first_rect); % save the first template as `first_template`
			
			% add first rectangle to rectangles matrix
			rects{imageIndex} = first_rect;
			
			% set `template` (becomes the template we look for in the next frame)
			template = first_template;
			
			firstImage = false;
			
		else % if second image or greater
			
			% 2D normalized cross-correlation coefficient matrix
            xcorr = normxcorr2(template, image);
			
			% find (x,y) position of peak correlation 
            [ypeak_offset xpeak_offset] = find(xcorr==max(xcorr(:)));
			% (values are offset due to the way correlation works)
            
			% create a rectangle object to represent the template
			xpeak  = xpeak_offset - size(template,2) + 1; % corrected for offset
			ypeak  = ypeak_offset - size(template,1) + 1; % corrected for offset
			width  = size(template,2) - 1;
			height = size(template,1) - 1;
			rect = [xpeak ypeak width height];
			
			% add rectangle to rectangles matrix
			rects{imageIndex} = rect;
            
			% set `current_template` (the template we found in this frame)
			current_template = imcrop(image, rect);
			
			% set `template` (we look for in next frame) as average of: first template & current template 
            template = 0.5*first_template + 0.5*current_template;
			
		end % end else (if not firstImage)
		
	end % end for (each image)
	
end % end function demoTemplateTrackingBefore(images, first_rect)