export default function Post({ params}) {
    return (
        <div>
            <h1>{params.slug}</h1>
        </div>
    );
}