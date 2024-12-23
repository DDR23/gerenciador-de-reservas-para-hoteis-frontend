import { Box, Progress, Text, Center, Group } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

interface Props {
  value: string;
}

const requirements = [
  { re: /[0-9]/, label: 'Conter número' },
  { re: /[a-z]/, label: 'Conter letra minúscula' },
  { re: /[A-Z]/, label: 'Conter letra maiúscula' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Conter caractere especial' },
];

export const getStrength = (password: string) => {
  const unmet = requirements.filter(req => !req.re.test(password)).length;
  const baseScore = password.length > 5 ? 0 : 1; // Penalidade para senhas curtas
  const penalty = unmet + baseScore;
  return Math.max(100 - (100 / (requirements.length + 1)) * penalty, 0);
};

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => (
  <Text component='div' c={meets ? 'teal' : 'red.6'} size="sm" mt={5}>
    <Center inline>
      {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
      <Box ml={7}>{label}</Box>
    </Center>
  </Text>
);

export default function PasswordStrength({ value }: Props) {
  const strength = getStrength(value);
  const bars = Array.from({ length: 4 }, (_, index) => (
    <Progress
      key={index}
      value={strength >= ((index + 1) / 4) * 100 ? 100 : 0}
      color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
      size={4}
    />
  ));

  return (
    <div>
      <Group gap={5} grow mt="xs" mb="md">
        {bars}
      </Group>
      <PasswordRequirement label="Conter pelo menos 6 caracteres" meets={value.length > 5} />
      {requirements.map((req, idx) => (
        <PasswordRequirement key={idx} label={req.label} meets={req.re.test(value)} />
      ))}
    </div>
  );
}
