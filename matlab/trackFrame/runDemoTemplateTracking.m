% path should already be added
%addpath('/Users/tylor/.../jsonlab/');

%---- Step 1 ----% load runConfig from .json file
runConfig = loadjson('runConfig_input.json');

%---- Step 2 ----% translate: web paradigm --> matlab paradigm
numFrames = length(runConfig.input.playerConfig.frames);
for frameIndex = 1:numFrames % for each frame
	images{frameIndex} = runConfig.input.playerConfig.frames{frameIndex}.name;
end

rect = runConfig.input.playerConfig.frames{1}.rectangles{1};
rect = [rect.x rect.y rect.width rect.height]; % [x y width height]

%---- Step 3 ----% run matlab function
rects = demoTemplateTracking(images, rect);


%---- Step 4 ----% translate: matlab paradigm --> web paradigm

% create output video player from input video player
runConfig.output.playerConfig = runConfig.input.playerConfig;

for frameIndex = 1:numFrames % for each frame
	runConfig.output.playerConfig.frames{frameIndex}.rectangles{1} = struct();
	runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.x = rects{frameIndex}(1);
	runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.y = rects{frameIndex}(2);
	runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.width  = rects{frameIndex}(3);
	runConfig.output.playerConfig.frames{frameIndex}.rectangles{1}.height = rects{frameIndex}(4);
	
	runConfig.output.linecharts{1}.values(frameIndex) = rects{frameIndex}(1);
	runConfig.output.linecharts{2}.values(frameIndex) = rects{frameIndex}(2);
end

runConfig.output.linecharts{1}.title = 'x-position';
runConfig.output.linecharts{2}.title = 'y-position';

%---- Step 5 ----% save runConfig to file
savejson('', runConfig, 'FileName', 'runConfig_output.json', 'ParseLogical', 1);

