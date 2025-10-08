namespace cap.bookshop;

entity Books {
    key ID    : Integer;
        title : String;
        stock : Integer;

        @assert.range: [
            1,
            300
        ]
        price : Integer;
}
