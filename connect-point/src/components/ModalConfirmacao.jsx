import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ModalConfirmacao({onConfirm}) {

  return (
    <Dialog>
      <form className="w-31 h-12">
        <DialogTrigger asChild>
          <Button variant="salvarPerfil" size="wmax">Salvar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogDescription> 
              Você tem certeza que deseja alterar os dados do seu perfil?
              Lembre que algumas informações são públicas para outros usuários.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" onClick={onConfirm}>Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
