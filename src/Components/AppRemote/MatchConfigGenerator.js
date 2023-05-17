/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Container, Input, Select, Flex ,Text,Box} from "@mantine/core";

const SelectComponent = ({ label, options }) => {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
  return (
    <Select
      label={t(label)}
      placeholder="Pick one"
      data={options}
      required
      withAsterisk
      sx={(theme) => ({
        width: "300px",
        textTransform: "capitalize",
      })}
    />
  );
};

const InputComponent = ({ label, value }) => {
  const { t } = useTranslation("common");
  return (
    <Input.Wrapper id="input-demo" withAsterisk label={t(label)}>
      <Input
        id="input-demo"
        defaultValue={value}
        required
        sx={(theme) => ({
          width: "300px",
          textTransform: "capitalize",
        })}
      />
    </Input.Wrapper>
  );
};

const MatchConfigGenerator = ({ sport }) => {
  const renderComponent = (label, value) => {
    if (Array.isArray(value)) {
      return <SelectComponent label={label} options={value} />;
    } else if (typeof value === "number") {
      return <InputComponent label={label} value={value} />;
    }
    return null;
  };

  const renderDetails = () => {
    const { t } = useTranslation("common");
    if (sport && sport.Details) {
      const { Details, ...rest } = sport;
      return (
       
        <Container
          sx={(theme) => ({
            paddingTop: "15%",
          })}
        >
          <Flex direction="column" justify="center" align="center">
          <Text weight={700} size="lg" mb="md">
          {t("Parametres")}
            </Text>
            {Object.entries(Details).map(([key, value]) => (
              <Box key={key} mb="lg">{renderComponent(key, value)}</Box>
            ))}
          </Flex>
        </Container>
     
      );
    }
    return null;
  };

  return renderDetails();
};

export default MatchConfigGenerator;
