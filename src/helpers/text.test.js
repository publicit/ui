import text from "./text";

test("should remove leading spaces", () => {
  const source = "   something is going on";
  let got = text.trimAll(source);
  expect(got).toBe("something is going on");
});

test("should remove trailing spaces", () => {
  const source = "something is going on  ";
  let got = text.trimAll(source);
  expect(got).toBe("something is going on");
});

test("should trim nested structures in json object", () => {
  const source = {
    person: {
      name: " testing ",
      parent: " parent ",
    },
  };
  let got = text.trimAll(source);
  expect(got).toStrictEqual({
    person: {
      name: "testing",
      parent: "parent",
    },
  });
});

test("should trim nested structures in json array", () => {
  const source = [
    {
      person: {
        name: " testing ",
        parent: " parent ",
      },
    },
  ];
  let got = text.trimAll(source);
  expect(got).toStrictEqual([
    {
      person: {
        name: "testing",
        parent: "parent",
      },
    },
  ]);
});
