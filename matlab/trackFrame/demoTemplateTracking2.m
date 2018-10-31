function demoTemplateTracking2() % takes no arguments (reads .json file instead)
	% path should already be added
    %addpath('/Users/tylor/.../jsonlab/');
	
	% load runConfig from .json file
	runConfig = loadjson('runConfig_input.json');
	
	% create output video player from input video player
	runConfig.output.playerConfig = runConfig.input.playerConfig; 
	
	firstFrame = true;
	numFrames = length(runConfig.input.playerConfig.frames);
	for frameIndex = 1:numFrames % for each frame
		image = imread(runConfig.input.playerConfig.frames{frameIndex}.name);
		image = rgb2gray(image);
        image = imadjust(image);
		if (firstFrame)
			% get/set template from user-drawn rectangle
			rect = runConfig.input.playerConfig.frames{1}.rectangles{1};
			rect = [rect.x rect.y rect.width rect.height]; % [x y width height]
			template_original = imcrop(image, rect);
			template          = template_original;
			
			firstFrame = false;
		else % if second frame or greater
			
			% 2D normalized cross-correlation coefficient matrix
            xcorr = normxcorr2(template, image);
			
			% Find (x,y) position of peak correlation
            %[maxCorrValue, maxIndex] = max(abs(xcorr(:)));
            %[ypeak, xpeak] = ind2sub(size(xcorr),maxIndex(1));
            [ypeak xpeak] = find(xcorr==max(xcorr(:)));
			
			%corr_offset = [(xpeak - size(template,2)) (ypeak - size(template,1))];
            %rect = [corr_offset(1) corr_offset(2) size(template,2) size(template,1)];
            corr_offset = [(xpeak - size(template,2) + 1) (ypeak - size(template,1) + 1)];
            rect = [(corr_offset(1)) (corr_offset(2)) (size(template,2) - 1) (size(template,1) - 1)];
            template = imcrop(image, rect);
            template = 0.5*template + 0.5*template_original;
			
			runConfig.output.playerConfig.frames{frameIndex}.rectangles{1} = struct();
			runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.x = rect(1);
			runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.y = rect(2);
			runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.width  = rect(3);
			runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.height = rect(4);
		end % else = if (not firstFrame)
		
		% all frames (outside firstFrame or not)
		runConfig.output.linecharts{1}.values(frameIndex) = rect(1);
		runConfig.output.linecharts{2}.values(frameIndex) = rect(2);
		
	end % for 
	
	runConfig.output.linecharts{1}.title = 'x-position';
	runConfig.output.linecharts{2}.title = 'y-position';
	savejson('', runConfig, 'FileName', 'runConfig_output.json', 'ParseLogical', 1);
	%savejson('', runConfig, 'FileName', 'runConfig_output.json', 'ParseLogical', 1, 'Compact', 1);
	
	% no return value (writes .json file instead)
end