## Pagination

# Pagination with maximum pagination size 7

      const currentPage = 1;
      const itemsPerPage = 5;
      const totalItems = 85;
      const maximumPaginationSize = 7;
      const onChange = (page) => {};

      (
          <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              maximumPaginationSize={maximumPaginationSize}
              onChange={onChange}
          />
      )

# Pagination with maximum pagination size 5

      const currentPage = 8;
      const itemsPerPage = 5;
      const totalItems = 85;
      const maximumPaginationSize = 5;
      const onChange = (page) => {};

      (
          <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              maximumPaginationSize={maximumPaginationSize}
              onChange={onChange}
          />
      )

# Pagination with maximum pagination size 7 and items 30

      const currentPage = 1;
      const itemsPerPage = 5;
      const totalItems = 30;
      const maximumPaginationSize = 7;
      const onChange = (page) => {};

      (
          <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              maximumPaginationSize={maximumPaginationSize}
              onChange={onChange}
          />
      )

# Pagination with maximum pagination size 9

      const currentPage = 1;
      const itemsPerPage = 5;
      const totalItems = 85;
      const maximumPaginationSize = 9;
      const onChange = (page) => {};

      (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          maximumPaginationSize={maximumPaginationSize}
          onChange={onChange}
        />
      )

# Pagination with onChange event

      const currentPage = 1;
      const itemsPerPage = 5;
      const totalItems = 85;
      const maximumPaginationSize = 7;
      const onChange = (page) => {
          console.log(`Selected page ${page}`);
      };

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />

# Pagination set page from outer component

      const initialState = { currentPage: 1 };
      const inputValue = state.currentPage;
      const itemsPerPage = 5;
      const totalItems = 85;
      const maximumPaginationSize = 7;
      const setPage = (e) => { setState({currentPage: Number(e.target.value)}) };
      const onChange = (page) => {};

      (
        <div>
          <Pagination
            currentPage={state.currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            maximumPaginationSize={maximumPaginationSize}
            onChange={onChange}
          />
          <input type="number" defaultValue={state.currentPage} onChange={setPage}/>
        </div>
      )

# Pagination with `showGotoPage` option enabled

      const currentPage = 1;
      const itemsPerPage = 5;
      const totalItems = 85;
      const onChange = (page) => {};

      (
          <Pagination
              showGotoPage={true}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onChange={onChange}
          />
      )

# Pagination with custom label function

      const currentPage = 8;
      const itemsPerPage = 5;
      const totalItems = 85;
      const maximumPaginationSize = 5;
      const onChange = (page) => {};
      const customLabelFunction = (page) => {
        return `Page ${page}`;
      };

      (
          <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              maximumPaginationSize={maximumPaginationSize}
              onChange={onChange}
              getCustomLabel={customLabelFunction}
          />
      )
