interface Res {
  example: {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
  }
};

export default async function Example() {
  const res = await fetch("http://localhost:3001/v1/examples/1");
  const { example } = await res.json() as Res;

  console.log(example);

  return (
    example ?
      <div className="flex flex-col gap-4">
        <pre>
          <code className="text-sm text-gray-500">
            {JSON.stringify(example, null, 2)}
          </code>
        </pre>
        <dl className="flex gap-2">
          <dt>id:</dt>
          <dd>{example.id}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>name:</dt>
          <dd>{example.name}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>description:</dt>
          <dd>{example.description}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>createdAt:</dt>
          <dd>{new Date(example.createdAt).toLocaleString()}</dd>
        </dl>
      </div >
      :
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          データの取得に失敗しました。<br />
          リロードしてください。
        </p>
      </div>
  )
}
