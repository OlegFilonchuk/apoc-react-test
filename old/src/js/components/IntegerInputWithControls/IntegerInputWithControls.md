Allow to render [`<Input>`](#input) together with two [`<Button>`](#button) components, designated to increase/decrease integer value inside [`<Input>`](#input) by 1.

You can pass all of the [`<Input>` props](#input) to the `<IntegerInputWithControls>` component.
Please pass `wrapperClassName` prop to adjust `<IntegerInputWithControls>` styles.
Passed `label` prop will be used as label text and as `id` of base input.

# Example
    (
      <IntegerInputWithControls
        label="Some label"
        value="2"
      />
    )
