/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Container, Input, Select, Flex, Text, Box, Button, NumberInput ,Group, Paper} from "@mantine/core";
import { useSport } from "@/Context/SportContext";

const SelectComponent = ({ label, options }) => {
  const { locale } = useRouter();

  return (
    <Select
      label={label}
      name={label}
      description={options.description}
      placeholder="Pick one"
      data={options.value}
      defaultValue={options.value[0]}
      required
      withAsterisk
      sx={(theme) => ({
        width: "300px",
        textTransform: "capitalize",
      })}
    />
  );
};

const InputComponent = ({label, value}) => {


  return (
    <Input.Wrapper id="input-demo" withAsterisk label={label} description={value.description}>
      {typeof value.value === "number" ? (
        <NumberInput
          type="number"
          name={label}
          id="input-demo"
          defaultValue={value.value}
          required
          sx={(theme) => ({
            width: "300px",
            textTransform: "capitalize",
          })}
        />
      ) : (
        <Input
          type="text"
          name={label}
          id="input-demo"
          defaultValue={value.value}
          required
          sx={(theme) => ({
            width: "300px",
            textTransform: "capitalize",
          })}
        />
      )}
    </Input.Wrapper>
  );
};

const MatchConfigGenerator = ({  prevStep }) => {
 const SportContext = useSport()
  const renderComponent = (label, value) => {
    if(!value.display) {
      return <input name={label} value={value.value} type="number" style={{display:"none"}}></input>
    }
    if (Array.isArray(value.value)) {
      return <SelectComponent label={label} options={value} />;
    } else {
      return <InputComponent label={label} value={value} />;
    }
    return null;
  };

  const renderDetails = () => {
  
    if (SportContext.Sport && SportContext.getSportConfig().Details) {
      const { Details, ...rest } = SportContext.getSportConfig();
      return (
        <Container
        sx={(theme) => ({
          paddingBottom: "10%",
        })}
      >
        <Group
          position="center"
          my="xl"
         
        >
            <Button variant="default" type="button" onClick={()=> SportContext.setSport("")}>
              Back
            </Button>
            <Button type="submit">Next step</Button>
          </Group>
          <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          sx={(theme) => ({
            gridArea: "d",
            width: "fit-content",
          })}
        >
          <Flex direction="column" justify="center" align="center"  >
            <Text weight={700} size="lg" mb="md">
            Parametres
            </Text>
    
            <Flex wrap="wrap" justify="center" align="center" p="xl" gap="xl">
            {Object.entries(Details).map(([key, value]) => (
              <Box key={key} mb="sm" >
                {renderComponent(key, value)}
              </Box>
            ))}
              </Flex>
              </Flex>
      
          </Paper>
        </Container>
      );
    }
    return null;
  };

  return renderDetails();
};

export default MatchConfigGenerator;
