import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const transactionSchema = z.object({
  sender_name: z.string().min(1, "Name is required").max(100),
  sender_email: z.string().email("Invalid email").max(255),
  amount: z.string().min(1, "Amount is required"),
  payment_reference: z.string().min(1, "Reference is required").max(100),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching transactions:", error);
      return;
    }

    setTransactions(data || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onSubmit = async (data: TransactionFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("transactions").insert({
        sender_name: data.sender_name,
        sender_email: data.sender_email,
        amount: parseFloat(data.amount),
        payment_reference: data.payment_reference,
        payment_status: "completed",
      });

      if (error) throw error;

      toast({
        title: "Transaction recorded",
        description: "Your transaction has been successfully recorded.",
      });

      reset();
      fetchTransactions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to record transaction",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20 pb-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Bank Details */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-roboto">Bank Account Details</CardTitle>
                <CardDescription>Make payment to this account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Account Number</p>
                    <p className="font-semibold">0293520577</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bank</p>
                    <p className="font-semibold">Wema Bank</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Name</p>
                    <p className="font-semibold">Oluwashinaayomi Williams Nelson-Abiodun</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Form */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-roboto">Record Transaction</CardTitle>
                <CardDescription>Enter your transaction details after making payment</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender_name">Your Name</Label>
                    <Input
                      id="sender_name"
                      {...register("sender_name")}
                      placeholder="John Doe"
                      className="glass"
                    />
                    {errors.sender_name && (
                      <p className="text-sm text-destructive">{errors.sender_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sender_email">Your Email</Label>
                    <Input
                      id="sender_email"
                      type="email"
                      {...register("sender_email")}
                      placeholder="john@example.com"
                      className="glass"
                    />
                    {errors.sender_email && (
                      <p className="text-sm text-destructive">{errors.sender_email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (NGN)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      {...register("amount")}
                      placeholder="10000.00"
                      className="glass"
                    />
                    {errors.amount && (
                      <p className="text-sm text-destructive">{errors.amount.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment_reference">Payment Reference</Label>
                    <Input
                      id="payment_reference"
                      {...register("payment_reference")}
                      placeholder="Transaction reference or ID"
                      className="glass"
                    />
                    {errors.payment_reference && (
                      <p className="text-sm text-destructive">{errors.payment_reference.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Recording...
                      </>
                    ) : (
                      "Record Transaction"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-roboto">Transaction History</CardTitle>
                <CardDescription>All recorded transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No transactions yet</p>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="p-4 rounded-lg border border-border/50 space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{transaction.sender_name}</p>
                            <p className="text-sm text-muted-foreground">{transaction.sender_email}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">
                              {transaction.currency} {parseFloat(transaction.amount).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(transaction.created_at), "PPp")}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">
                            Reference: <span className="text-foreground">{transaction.payment_reference}</span>
                          </p>
                          <p className="text-muted-foreground">
                            Status: <span className="text-foreground capitalize">{transaction.payment_status}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Transactions;
