import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, AlertTriangle, RotateCcw, Download } from 'lucide-react';

interface DiagnosticResultProps {
  score: number;
  answers: Record<string, number>;
  onRestart: () => void;
}

export const DiagnosticResult: React.FC<DiagnosticResultProps> = ({ score, answers, onRestart }) => {
  const maxScore = 72; // 24 questions × 3 points
  const percentage = (score / maxScore) * 100;

  const getResultLevel = () => {
    if (score >= 60) {
      return {
        title: 'Gestão Inovadora e Madura',
        subtitle: 'Alto nível de eficiência',
        description: 'Sua instituição demonstra excelência em gestão digital e processos modernizados. Continue investindo em inovação e capacitação para manter-se na vanguarda.',
        color: 'success',
        icon: CheckCircle,
        recommendations: [
          'Implemente soluções de inteligência artificial para otimizar processos',
          'Desenvolva programas de inovação interna',
          'Compartilhe boas práticas com outras instituições',
          'Invista em segurança cibernética avançada'
        ]
      };
    } else if (score >= 40) {
      return {
        title: 'Gestão em Evolução',
        subtitle: 'Oportunidade de consolidação',
        description: 'Sua instituição está no caminho certo, com bons fundamentos digitais. Foque em consolidar os processos existentes e expandir a digitalização.',
        color: 'warning',
        icon: TrendingUp,
        recommendations: [
          'Padronize processos digitais existentes',
          'Implemente sistema integrado de gestão',
          'Capacite equipes em ferramentas digitais',
          'Desenvolva portal de transparência mais robusto'
        ]
      };
    } else {
      return {
        title: 'Gestão com Alto Potencial',
        subtitle: 'Oportunidade de transformação',
        description: 'Sua instituição tem grande potencial de modernização. Recomenda-se um plano estruturado de transformação digital para alcançar maior eficiência.',
        color: 'destructive',
        icon: AlertTriangle,
        recommendations: [
          'Elabore plano de transformação digital',
          'Inicie digitalização de documentos principais',
          'Implemente sistema básico de gestão',
          'Capacite equipes em tecnologias básicas'
        ]
      };
    }
  };

  const result = getResultLevel();
  const Icon = result.icon;

  const getScoresByCategory = () => {
    const categories = [
      { name: 'Documentação Digital', questions: ['q1', 'q2', 'q22'] },
      { name: 'Comunicação e Colaboração', questions: ['q4', 'q5', 'q18', 'q23'] },
      { name: 'Gestão Financeira', questions: ['q6', 'q7', 'q19'] },
      { name: 'Recursos Humanos', questions: ['q8', 'q15', 'q16'] },
      { name: 'Atendimento ao Cidadão', questions: ['q9', 'q10', 'q11'] },
      { name: 'Análise e Controle', questions: ['q12', 'q13', 'q21'] },
      { name: 'Gestão de Projetos', questions: ['q14', 'q24'] },
      { name: 'Segurança e Controle', questions: ['q3', 'q17'] },
      { name: 'Participação Social', questions: ['q20'] }
    ];

    return categories.map(category => {
      const categoryScore = category.questions.reduce((sum, qId) => sum + (answers[qId] || 0), 0);
      const maxCategoryScore = category.questions.length * 3;
      const categoryPercentage = (categoryScore / maxCategoryScore) * 100;
      
      return {
        ...category,
        score: categoryScore,
        maxScore: maxCategoryScore,
        percentage: categoryPercentage
      };
    });
  };

  const categoryScores = getScoresByCategory();

  const handleDownloadReport = () => {
    // Simple report generation
    const reportContent = `
RELATÓRIO DE DIAGNÓSTICO INOVALLY
================================

Pontuação Total: ${score}/${maxScore} (${percentage.toFixed(1)}%)
Nível: ${result.title} - ${result.subtitle}

ANÁLISE POR CATEGORIA:
${categoryScores.map(cat => 
  `${cat.name}: ${cat.score}/${cat.maxScore} (${cat.percentage.toFixed(1)}%)`
).join('\n')}

RECOMENDAÇÕES:
${result.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

Data do diagnóstico: ${new Date().toLocaleDateString('pt-BR')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnostico-inovally.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Main Result */}
      <Card className={`shadow-large border-l-4 ${
        result.color === 'success' ? 'border-l-success' :
        result.color === 'warning' ? 'border-l-warning' :
        'border-l-destructive'
      }`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`rounded-full p-4 ${
              result.color === 'success' ? 'bg-success/10' :
              result.color === 'warning' ? 'bg-warning/10' :
              'bg-destructive/10'
            }`}>
              <Icon className={`w-12 h-12 ${
                result.color === 'success' ? 'text-success' :
                result.color === 'warning' ? 'text-warning' :
                'text-destructive'
              }`} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold mb-2">
            {result.title}
          </CardTitle>
          <p className="text-xl text-muted-foreground mb-4">
            {result.subtitle}
          </p>
          <div className="space-y-3">
            <div className="text-4xl font-bold">
              {score}<span className="text-xl text-muted-foreground">/{maxScore}</span>
            </div>
            <Progress value={percentage} className="h-4" />
            <p className="text-lg">
              {percentage.toFixed(1)}% do potencial de digitalização
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg leading-relaxed">
            {result.description}
          </p>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Análise por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryScores.map((category, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{category.name}</h4>
                  <Badge variant={category.percentage >= 80 ? 'default' : category.percentage >= 50 ? 'secondary' : 'destructive'}>
                    {category.percentage.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {category.score}/{category.maxScore} pontos
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recomendações Personalizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-base">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRestart}
          variant="outline"
          className="flex items-center gap-2 min-w-[160px]"
        >
          <RotateCcw className="w-4 h-4" />
          Refazer Diagnóstico
        </Button>
        <Button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 min-w-[160px] bg-gradient-primary hover:opacity-90"
        >
          <Download className="w-4 h-4" />
          Baixar Relatório
        </Button>
      </div>
    </div>
  );
};