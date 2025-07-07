import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import admin from "firebase-admin";

interface RegisterIngameRequest {
  Email: string;
  Username: string;
}

export async function POST(req: NextRequest) {
  try {
    const { Email, Username } = (await req.json()) as Partial<RegisterIngameRequest>;

    if (!Email || !Username) {
      return NextResponse.json(
        { success: false, error: "Dados incompletos." },
        { status: 400 }
      );
    }

    const snapshot = await db.collection("users").where("Email", "==", Email).get();

    if (snapshot.empty) {
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    const usernames: string[] = Array.isArray(data.Usernames) ? data.Usernames : [];

    if (usernames.length >= 3) {
      return NextResponse.json(
        { success: false, error: "Usernames já preenchidos." },
        { status: 409 }
      );
    }

    await doc.ref.update({
      Usernames: admin.firestore.FieldValue.arrayUnion(Username),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Erro ao registrar username ingame:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno", details: err.message },
      { status: 500 }
    );
  }
}

