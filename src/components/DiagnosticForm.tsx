import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: {
    value: number;
    text: string;
  }[];
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'Como os documentos oficiais da sua instituição são armazenados?',
    options: [
      { value: 3, text: 'Totalmente digital com acesso seguro e versionamento automático' },
      { value: 1, text: 'Parte digital, parte em papel' },
      { value: 0, text: 'Tudo ainda em papel' }
    ]
  },
  {
    id: 'q2',
    text: 'O fluxo de aprovação de documentos é automatizado?',
    options: [
      { value: 3, text: 'Sim, com etapas digitais e trilha de auditoria' },
      { value: 1, text: 'Parcialmente, com etapas físicas' },
      { value: 0, text: 'Processo totalmente manual' }
    ]
  },
  {
    id: 'q3',
    text: 'Como é feito o controle de acesso aos sistemas da instituição?',
    options: [
      { value: 3, text: 'Sistema integrado com autenticação multifator' },
      { value: 1, text: 'Controle básico com senhas' },
      { value: 0, text: 'Sem controle específico' }
    ]
  },
  {
    id: 'q4',
    text: 'A comunicação interna da instituição utiliza quais ferramentas?',
    options: [
      { value: 3, text: 'Plataformas digitais integradas e colaborativas' },
      { value: 1, text: 'E-mail e algumas ferramentas digitais' },
      { value: 0, text: 'Principalmente papel e telefone' }
    ]
  },
  {
    id: 'q5',
    text: 'Como são realizadas as reuniões e assembleias?',
    options: [
      { value: 3, text: 'Híbridas com ferramentas de videoconferência e gravação' },
      { value: 1, text: 'Presenciais com algumas ferramentas digitais' },
      { value: 0, text: 'Exclusivamente presenciais' }
    ]
  },
  {
    id: 'q6',
    text: 'O controle financeiro e orçamentário é feito como?',
    options: [
      { value: 3, text: 'Sistema integrado com dashboards e relatórios automáticos' },
      { value: 1, text: 'Planilhas eletrônicas e sistemas básicos' },
      { value: 0, text: 'Controle manual em papel' }
    ]
  },
  {
    id: 'q7',
    text: 'Como é o processo de compras e licitações?',
    options: [
      { value: 3, text: 'Totalmente digitalizado com portal de fornecedores' },
      { value: 1, text: 'Parcialmente digital' },
      { value: 0, text: 'Processo tradicional em papel' }
    ]
  },
  {
    id: 'q8',
    text: 'A gestão de recursos humanos utiliza quais ferramentas?',
    options: [
      { value: 3, text: 'Sistema integrado com autoatendimento digital' },
      { value: 1, text: 'Sistemas básicos e planilhas' },
      { value: 0, text: 'Controle manual e papel' }
    ]
  },
  {
    id: 'q9',
    text: 'Como é feita a prestação de contas à população?',
    options: [
      { value: 3, text: 'Portal transparente com dados em tempo real' },
      { value: 1, text: 'Relatórios periódicos disponibilizados online' },
      { value: 0, text: 'Relatórios impressos e murais' }
    ]
  },
  {
    id: 'q10',
    text: 'O atendimento ao cidadão é realizado através de quais canais?',
    options: [
      { value: 3, text: 'Múltiplos canais digitais integrados (app, site, chat)' },
      { value: 1, text: 'Presencial com alguns canais digitais' },
      { value: 0, text: 'Exclusivamente presencial' }
    ]
  },
  {
    id: 'q11',
    text: 'Como são gerenciados os protocolos e petições?',
    options: [
      { value: 3, text: 'Sistema digital com acompanhamento em tempo real' },
      { value: 1, text: 'Sistema básico com consulta limitada' },
      { value: 0, text: 'Protocolos manuais em papel' }
    ]
  },
  {
    id: 'q12',
    text: 'A análise de dados para tomada de decisão utiliza quais recursos?',
    options: [
      { value: 3, text: 'Business Intelligence com dashboards interativos' },
      { value: 1, text: 'Relatórios básicos e planilhas' },
      { value: 0, text: 'Decisões baseadas em experiência pessoal' }
    ]
  },
  {
    id: 'q13',
    text: 'Como é feito o controle de qualidade dos serviços?',
    options: [
      { value: 3, text: 'Sistema de indicadores digitais com monitoramento contínuo' },
      { value: 1, text: 'Avaliações periódicas manuais' },
      { value: 0, text: 'Sem sistema formal de controle' }
    ]
  },
  {
    id: 'q14',
    text: 'A gestão de projetos utiliza quais metodologias?',
    options: [
      { value: 3, text: 'Metodologias ágeis com ferramentas digitais' },
      { value: 1, text: 'Gestão tradicional com algumas ferramentas' },
      { value: 0, text: 'Sem metodologia estruturada' }
    ]
  },
  {
    id: 'q15',
    text: 'Como é realizada a capacitação dos servidores?',
    options: [
      { value: 3, text: 'Plataforma de ensino digital com trilhas personalizadas' },
      { value: 1, text: 'Cursos presenciais e alguns online' },
      { value: 0, text: 'Capacitação informal ou inexistente' }
    ]
  },
  {
    id: 'q16',
    text: 'O controle de frequência e produtividade é feito como?',
    options: [
      { value: 3, text: 'Sistema biométrico integrado com indicadores de performance' },
      { value: 1, text: 'Controle básico de ponto' },
      { value: 0, text: 'Controle manual ou inexistente' }
    ]
  },
  {
    id: 'q17',
    text: 'Como é a segurança digital da instituição?',
    options: [
      { value: 3, text: 'Política de segurança robusta com backup automático' },
      { value: 1, text: 'Medidas básicas de segurança' },
      { value: 0, text: 'Sem política específica de segurança digital' }
    ]
  },
  {
    id: 'q18',
    text: 'A instituição possui sistema de ouvidoria?',
    options: [
      { value: 3, text: 'Ouvidoria digital integrada com SIC e acompanhamento' },
      { value: 1, text: 'Ouvidoria básica presencial' },
      { value: 0, text: 'Sem sistema formal de ouvidoria' }
    ]
  },
  {
    id: 'q19',
    text: 'Como é feito o controle patrimonial?',
    options: [
      { value: 3, text: 'Sistema digital com código de barras/RFID' },
      { value: 1, text: 'Planilhas eletrônicas básicas' },
      { value: 0, text: 'Controle manual em papel' }
    ]
  },
  {
    id: 'q20',
    text: 'A participação social é promovida através de quais meios?',
    options: [
      { value: 3, text: 'Plataformas digitais de participação e consulta pública' },
      { value: 1, text: 'Audiências públicas presenciais' },
      { value: 0, text: 'Sem mecanismos específicos de participação' }
    ]
  },
  {
    id: 'q21',
    text: 'Como é realizado o planejamento estratégico?',
    options: [
      { value: 3, text: 'Metodologia estruturada com monitoramento digital' },
      { value: 1, text: 'Planejamento básico anual' },
      { value: 0, text: 'Sem planejamento formal estruturado' }
    ]
  },
  {
    id: 'q22',
    text: 'O arquivo documental da instituição está organizado como?',
    options: [
      { value: 3, text: 'Arquivo digital com sistema de gestão documental' },
      { value: 1, text: 'Arquivo físico organizado com alguns documentos digitais' },
      { value: 0, text: 'Arquivo físico desorganizado' }
    ]
  },
  {
    id: 'q23',
    text: 'Como é feita a comunicação externa da instituição?',
    options: [
      { value: 3, text: 'Estratégia digital integrada (site, redes sociais, newsletter)' },
      { value: 1, text: 'Site básico e alguns canais tradicionais' },
      { value: 0, text: 'Comunicação tradicional (murais, jornais locais)' }
    ]
  },
  {
    id: 'q24',
    text: 'A instituição possui política de inovação e modernização?',
    options: [
      { value: 3, text: 'Política estruturada com comitê de inovação ativo' },
      { value: 1, text: 'Iniciativas pontuais de modernização' },
      { value: 0, text: 'Sem política ou iniciativas específicas' }
    ]
  }
];

interface DiagnosticFormProps {
  onComplete: (score: number, answers: Record<string, number>) => void;
}

export const DiagnosticForm: React.FC<DiagnosticFormProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    onComplete(totalScore, answers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const currentQuestionData = questions[currentQuestion];
  const isCurrentAnswered = answers[currentQuestionData.id] !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canSubmit = answeredQuestions === questions.length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Diagnóstico de Gestão Pública Inovally
          </CardTitle>
          <p className="text-lg opacity-90">
            Avalie o nível de digitalização e modernização da sua instituição
          </p>
        </CardHeader>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Progresso: {answeredQuestions}/{questions.length} questões</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>
            <CardTitle className="text-xl">
              {currentQuestionData.text}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestionData.id]?.toString() || ''}
            onValueChange={(value) => handleAnswerChange(currentQuestionData.id, parseInt(value))}
            className="space-y-4"
          >
            {currentQuestionData.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <RadioGroupItem value={option.value.toString()} id={`${currentQuestionData.id}-${option.value}`} />
                <Label
                  htmlFor={`${currentQuestionData.id}-${option.value}`}
                  className="flex-1 text-base cursor-pointer"
                >
                  {option.text}
                </Label>
                <div className="flex items-center gap-1">
                  {option.value === 3 && <CheckCircle className="w-5 h-5 text-success" />}
                  {option.value === 1 && <TrendingUp className="w-5 h-5 text-warning" />}
                  {option.value === 0 && <AlertTriangle className="w-5 h-5 text-destructive" />}
                  <span className="text-sm font-medium">{option.value} pts</span>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="min-w-[120px]"
        >
          ← Anterior
        </Button>

        <div className="flex gap-4">
          {!isLastQuestion ? (
            <Button
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className="min-w-[120px] bg-gradient-primary hover:opacity-90"
            >
              Próxima →
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="min-w-[140px] bg-gradient-primary hover:opacity-90 font-semibold"
            >
              Ver Resultado
            </Button>
          )}
        </div>
      </div>

      {/* Question indicators */}
      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
              answers[questions[index].id] !== undefined
                ? 'bg-success text-success-foreground'
                : index === currentQuestion
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};