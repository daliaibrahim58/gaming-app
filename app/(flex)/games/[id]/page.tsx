import GamePage from "@/components/GamePage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <GamePage id={Number(id)} />;
}
