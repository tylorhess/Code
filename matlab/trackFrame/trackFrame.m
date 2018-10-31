% function does not return anything because:
%    1) loadjson/savejson = input/output
%    2) can also parse `fprintf` or terminal output
function trackFrame() 
    runConfig = loadjson('runConfig_input.json');
%     runConfig = loadjson('{"input":{"playerConfig":{"rectangles":[]}}}');
    
    runConfig.output = runConfig.input;
    
    numFrames = length(runConfig.output.playerConfig.frames)
    for i = 1:numFrames
        runConfig.output.playerConfig.frames{i}.rectangles = {};
        runConfig.output.playerConfig.frames{i}.rectangles{1} = struct();
        runConfig.output.playerConfig.frames{i}.rectangles{1}.x      = 100;
        runConfig.output.playerConfig.frames{i}.rectangles{1}.y      = 100;
        runConfig.output.playerConfig.frames{i}.rectangles{1}.width  = 100;
        runConfig.output.playerConfig.frames{i}.rectangles{1}.height = 100;
    end
    
    savejson('', runConfig, 'FileName', 'runConfig_output.json', 'ParseLogical', 1)
%     savejson('', runConfig, 'FileName', 'runConfig_output.json', 'ParseLogical', 1, 'Compact', 1)
end
