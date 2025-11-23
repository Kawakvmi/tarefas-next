import { render, screen } from '@testing-library/react';
import NovaTarefa from '@/app/components/NovaTarefa';

describe('<NovaTarefa />', () => {
  it('renderiza input e botão', () => {
    render(<NovaTarefa />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    // Ajuste o texto do botão se for diferente no seu componente
    expect(
      screen.getByRole('button', { name: /adicionar|salvar|incluir/i })
    ).toBeInTheDocument();
  });
});
