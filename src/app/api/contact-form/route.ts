import { NextResponse } from "next/server";

const GFE_API = "https://questions.greatfrontend.com/api/questions/contact-form";

export async function POST(request: Request) {
	let body: { name?: string; email?: string; message?: string };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
	}

	const { name, email, message } = body;
	if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
		return NextResponse.json({ message: "name, email, and message are required." }, { status: 400 });
	}

	try {
		const res = await fetch(GFE_API, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, message }),
		});
		const text = await res.text();
		let data: { message?: string };
		try {
			data = text ? (JSON.parse(text) as { message?: string }) : {};
		} catch {
			data = { message: res.ok ? "Message sent successfully!" : "Something went wrong." };
		}
		return NextResponse.json(data, { status: res.status });
	} catch (err) {
		console.error("Contact form proxy error:", err);
		return NextResponse.json({ message: "Failed to submit. Please try again." }, { status: 502 });
	}
}
