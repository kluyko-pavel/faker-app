import faker from "faker";

const generateFakeData = (region, errors) => {
  const id = faker.random.uuid();
  let address = "";
  let phone = "";
  let firstName = "";
  let lastName = "";

  if (region === "USA") {
    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    const city = faker.address.city();
    const state = faker.address.stateAbbr();
    const zipCode = faker.address.zipCode("#####");
    const street = faker.address.streetAddress();
    const address2 =
      Math.random() < 0.5 ? faker.address.secondaryAddress() : "";
    address = `${street} ${address2}, ${city}, ${state} ${zipCode}`;
    phone = faker.phone.phoneNumberFormat();
  } else if (region === "Poland") {
    faker.locale = "pl";
    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    const postalCode = faker.address.zipCode("##-###");
    const city = faker.address.city();
    const street = faker.address.streetName();
    const houseNumber = faker.random.number({ min: 1, max: 200 });
    const apartmentNumber = faker.random.number({ min: 1, max: 200 });
    address = `${postalCode} ${city}, ${street} ${houseNumber}/${apartmentNumber}`;
    phone = faker.phone.phoneNumber("## ### ## ##");
  } else if (region === "Germany") {
    faker.locale = "de";
    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    const regionName = faker.address.state();
    const cityName = faker.address.city();
    const streetName = faker.address.streetName();
    const houseNumber = faker.random.number({ min: 1, max: 200 });
    const apartmentNumber = faker.random.number({ min: 1, max: 200 });
    address = `${regionName}, ${cityName}, ${streetName}, ${houseNumber}, ${apartmentNumber}`;
    phone = faker.phone.phoneNumber("+49 (0)151-###-####");
  }

  const fakeData = {
    id: id,
    name: `${firstName} ${lastName}`,
    address: address,
    phone: phone,
  };

  let newFakeData = JSON.parse(JSON.stringify(fakeData));

  for (let i = 0; i < errors; i += 0.25) {
    const randomError = Math.floor(Math.random() * 3);
    const errorIndex = Math.floor(
      Math.random() * Object.values(fakeData).length
    );
    let newValue;

    if (!randomError) {
      newValue = `${fakeData[Object.keys(fakeData)[errorIndex]].slice(0, -1)}`;
    } else if (randomError === 1) {
      const newChar =
        region === "USA"
          ? String.fromCharCode(faker.random.number({ min: 48, max: 57 }))
          : faker.lorem.word();
      newValue = `${fakeData[Object.keys(fakeData)[errorIndex]]}${newChar}`;
    } else if (randomError === 2) {
      const values = fakeData[Object.keys(fakeData)[errorIndex]].split("");
      const [a, b] = faker.helpers.shuffle(values);
      const newValues = values.map((value) =>
        value === a ? b : value === b ? a : value
      );
      newValue = `${newValues.join("")}`;
    }

    newFakeData[Object.keys(fakeData)[errorIndex]] = newValue;
  }

  return newFakeData;
};

const FakeDataGenerator = (region, recordsCount, seed, errors) => {
  faker.seed(seed);
  const fakeData = Array.from(new Array(recordsCount), () =>
    generateFakeData(region, errors)
  );
  return fakeData;
};

export default FakeDataGenerator;
