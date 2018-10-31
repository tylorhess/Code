
% load runConfig from .json file
runConfig = loadjson('runConfig_input.json');

% runConfig --> (image, first_rect)
numFrames = length(runConfig.input.playerConfig.frames);
for

rects = demoTemplateTracking(images, first_rect)

% rects --> runConfig

% output
savejson('', runConfig, 'FileName', 'runConfig_output.json', 'ParseLogical', 1);