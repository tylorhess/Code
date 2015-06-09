for n=1:205
    
    A = matfile(['CutImage' int2str(n) '.mat']);
    A = A.CutImage;
    if n<10
        filenameToSave = ['image_00000' int2str(n) '.jpg'];
    elseif n<100
        filenameToSave = ['image_0000'  int2str(n) '.jpg'];
    else
        filenameToSave = ['image_000'   int2str(n) '.jpg'];
    end
    imwrite(A, filenameToSave, 'jpg');
    
    %{
    % Load CutImage###.mat file into Figure 1
    filenameToLoad=strcat('CutImage',int2str(n));
    load(filenameToLoad);
    
    % Create image object from Figure 1
    imageObj=imagesc(CutImage);
    
    % Save image object as file
    if n<10
        filenameToSave = strcat('image_00000',int2str(n));
    elseif n<100
        filenameToSave = strcat('image_0000',int2str(n));
    else
        filenameToSave = strcat('image_000',int2str(n));
    end
    print(filenameToSave, '-djpeg'); % prints Figure 1
    %saveas(imageObj,strcat(filenameToSave,'-save.jpg'));
    %}
end