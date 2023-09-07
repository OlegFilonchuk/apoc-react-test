## Basic FileInput usage

    const onChange = (files) => {
      console.log(files);
    };

    <FileInput onChange={onChange} />

## FileInput with multiple files

    const onChange = (files) => {
      console.log(files);
    };

    <FileInput multiple onChange={onChange} />
